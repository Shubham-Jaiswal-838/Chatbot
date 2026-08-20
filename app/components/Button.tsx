import Link from 'next/link'

type ButtonProps = {
  children: React.ReactNode
  variant?: 'dark' | 'light'
  className?: string
  onClick?: () => void
  href?: string
}

export default function Button({ children, variant = 'dark', className = '', onClick, href }: ButtonProps) {
  const base =
    'inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]'

  const variants = {
    dark: 'bg-[#0d1b21] text-white',
    light: 'bg-white/90 text-[#0d1b21] backdrop-blur',
  }

  const content = (
    <>
      <span>{children}</span>
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#8fe3e0] text-[#0d1b21]">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </>
  )

  if (href) {
    return (
      <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
        {content}
      </Link>
    )
  }

  return (
    <button type="button" onClick={onClick} className={`${base} ${variants[variant]} ${className}`}>
      {content}
    </button>
  )
}