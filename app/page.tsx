import Header from './components/layout/Header'
import Hero from './components/Hero'


export default function Home() {
  return (
    <main className="min-h-screen w-full bg-[#f7f3ee]">
      <div
        className="relative flex min-h-screen w-full flex-col items-center overflow-hidden bg-[#f7f3ee] bg-cover bg-center"
        style={{
          backgroundColor: '#f7f3ee',
          backgroundImage: "url('/images/main_bg_image.png')",
        }}
      >
        <Header />
        <Hero />
      </div>
    </main>
  )
}