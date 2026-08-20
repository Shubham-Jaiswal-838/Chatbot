'use client'

import { memo, useEffect, useMemo, useRef, useState } from 'react'

type VirtualizedListProps<T> = {
  items: T[]
  itemHeight: number
  itemGap?: number
  overscan?: number
  topPadding?: number
  bottomPadding?: number
  estimateItemHeight?: (item: T, index: number) => number
  renderItem: (item: T, index: number) => React.ReactNode
  className?: string
  containerClassName?: string
  onScrollToBottom?: boolean
  getItemKey?: (item: T, index: number) => string
}

function VirtualizedList<T>({
  items,
  itemHeight,
  itemGap = 0,
  overscan = 3,
  topPadding = 0,
  bottomPadding = 0,
  estimateItemHeight,
  renderItem,
  className = '',
  containerClassName = '',
  onScrollToBottom = false,
  getItemKey = (_, index) => String(index),
}: VirtualizedListProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null)
  const prevItemCountRef = useRef(items.length)
  const hasInitializedRef = useRef(false)
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: Math.min(items.length, 12) })

  const estimatedHeights = useMemo(
    () => items.map((item, index) => estimateItemHeight ? estimateItemHeight(item, index) : itemHeight),
    [estimateItemHeight, itemHeight, items],
  )

  const offsets = useMemo(() => {
    const nextOffsets: number[] = []
    let cursor = topPadding

    for (let index = 0; index < items.length; index += 1) {
      nextOffsets.push(cursor)
      cursor += estimatedHeights[index] + itemGap
    }

    return nextOffsets
  }, [estimatedHeights, itemGap, items.length, topPadding])

  const totalHeight = useMemo(
    () => (items.length === 0 ? topPadding + bottomPadding : offsets[offsets.length - 1] + estimatedHeights[estimatedHeights.length - 1] + bottomPadding),
    [bottomPadding, estimatedHeights, items.length, offsets, topPadding],
  )

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const updateVisibleRange = () => {
      const scrollTop = container.scrollTop
      let startIndex = 0

      while (startIndex < offsets.length - 1 && offsets[startIndex + 1] <= scrollTop) {
        startIndex += 1
      }

      startIndex = Math.max(0, startIndex - overscan)

      let endIndex = startIndex
      const viewportBottom = scrollTop + container.clientHeight

      while (endIndex < offsets.length && offsets[endIndex] < viewportBottom + overscan * (itemHeight || 1)) {
        endIndex += 1
      }

      setVisibleRange({ start: startIndex, end: Math.min(items.length, endIndex + 1) })
    }

    updateVisibleRange()
    container.addEventListener('scroll', updateVisibleRange, { passive: true })

    return () => container.removeEventListener('scroll', updateVisibleRange)
  }, [itemHeight, items.length, offsets, overscan])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const isInitialLoad = !hasInitializedRef.current
    const hasNewItem = items.length > prevItemCountRef.current

    hasInitializedRef.current = true
    prevItemCountRef.current = items.length

    if (!onScrollToBottom || (!isInitialLoad && !hasNewItem)) return

    requestAnimationFrame(() => {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth',
      })
    })
  }, [items.length, onScrollToBottom])

  const startOffset = offsets[visibleRange.start] ?? topPadding
  const visibleItems = items.slice(visibleRange.start, visibleRange.end)

  return (
    <div ref={containerRef} className={className}>
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: startOffset,
            transform: 'translateZ(0)',
          }}
        >
          {visibleItems.map((item, index) => {
            const itemIndex = visibleRange.start + index
            const currentHeight = estimatedHeights[itemIndex] ?? itemHeight

            return (
              <div
                key={getItemKey(item, itemIndex)}
                style={{
                  height: currentHeight,
                  marginBottom: index === visibleItems.length - 1 ? 0 : itemGap,
                }}
              >
                {renderItem(item, itemIndex)}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default memo(VirtualizedList) as <T>(props: VirtualizedListProps<T>) => React.ReactElement
