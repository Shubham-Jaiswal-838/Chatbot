export default function VoiceListeningIndicator() {
  return (
    <div className="relative flex h-52 w-52 items-center justify-center sm:h-64 sm:w-64">
      <div
        className="absolute inset-2 animate-pulse rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(circle at 30% 30%, #f9a8d4, #a5b4fc 40%, #67e8f9 70%, #fef08a 100%)',
        }}
      />
      <div
        className="relative h-36 w-36 rounded-full border border-white/40 opacity-95 shadow-[0_0_40px_rgba(168,85,247,0.25)] sm:h-48 sm:w-48"
        style={{
          background:
            'radial-gradient(circle at 35% 35%, #fbcfe8, #c4b5fd 45%, #a5f3fc 75%, #fef9c3 100%)',
        }}
      />
    </div>
  )
}