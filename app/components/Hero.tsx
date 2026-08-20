
import Button from './Button'

export default function Hero() {
  return (
    <div className="flex w-full max-w-6xl flex-col items-center px-4 pb-12 pt-10 text-center sm:pt-14 md:pb-16">
      <span className="glass-pill rounded-full px-4 py-1.5 text-xs font-medium tracking-wide text-[#0d1b21]">
        AI-Powered Travel Planning
      </span>

      <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-[1.05] tracking-tight text-[#0d1b21] sm:text-5xl md:text-6xl">
        Your Journey,
        <br />
        Reimagined by AI
      </h1>

      <p className="mt-6 max-w-xl text-sm leading-relaxed text-[#2a3a3f] sm:text-[15px]">
        Describe your dream trip and let our AI architect craft the perfect itinerary
        with personalized recommendations and real-time insights.
      </p>

      <Button variant="dark" className="mt-8 cursor-pointer" href="/chat">
        Get started free
      </Button>
    </div>
  )
}