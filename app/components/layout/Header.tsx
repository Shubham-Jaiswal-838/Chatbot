import Link from 'next/link'
import Button from '../Button'

const navLinks = ['Destinations', 'How It Works', 'Itineraries', 'Bookings']

export default function Header() {
  return (
    <header className="flex w-full max-w-[1400px] items-center justify-between rounded-bl-[28px] rounded-br-[28px] px-4 py-3.5 glass-pill sm:px-6">
      <span className="text-lg font-bold tracking-tight text-[#0d1b21]">Asian Footwear.ai</span>

      <nav className="hidden gap-8 md:flex">
        {navLinks.map((link) => (
          <Link
            key={link}
            href="#"
            className="text-sm font-medium text-[#2a3a3f] transition-colors hover:text-[#0d1b21]"
          >
            {link}
          </Link>
        ))}
      </nav>

      <Button variant="dark" className="cursor-pointer" href="/chat">
        Plan My Trip
      </Button>
    </header>
  )
}
