export default function Loading() {
  return (
    <div className="h-screen w-full bg-[#0a0a0b] md:flex md:gap-[10px] md:p-1">
      <aside className="hidden max-w-[250px] shrink-0 overflow-hidden rounded-[14px] md:block">
        <div className="flex h-full flex-col justify-between bg-[#0f0f10] p-5 text-white">
          <div className="space-y-5">
            <div className="h-9 w-28 animate-pulse rounded-lg bg-white/10" />
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="h-10 animate-pulse rounded-lg bg-white/8" />
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <div className="h-10 animate-pulse rounded-lg bg-white/8" />
            <div className="h-10 animate-pulse rounded-lg bg-white/8" />
          </div>
        </div>
      </aside>

      <main className="relative flex h-full min-w-0 flex-1 flex-col overflow-hidden rounded-b-[14px] md:rounded-[14px] chat-bg-gradient">
        <div className="flex h-full flex-col px-8 pb-8 pt-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-8 w-8 animate-pulse rounded-full bg-white/10" />
            <div className="h-4 w-28 animate-pulse rounded-full bg-white/10" />
          </div>

          <div className="flex min-h-0 flex-1 flex-col gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`h-14 animate-pulse rounded-2xl ${
                    index % 2 === 0 ? 'w-56 bg-white/8' : 'w-44 bg-white/12'
                  }`}
                />
              </div>
            ))}
          </div>

          <div className="mt-6 h-20 animate-pulse rounded-b-2xl bg-[#1a1a1c]/80 md:rounded-2xl" />
        </div>
      </main>
    </div>
  )
}
