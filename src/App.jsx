import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Manifesto from './components/Manifesto.jsx'
import Marquee from './components/Marquee.jsx'
import TripGallery from './components/TripGallery.jsx'
import Highlights from './components/Highlights.jsx'
import Logistics from './components/Logistics.jsx'
import HouseRules from './components/HouseRules.jsx'
import FAQ from './components/FAQ.jsx'
import Footer from './components/Footer.jsx'
import StickyBookingBar from './components/StickyBookingBar.jsx'

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Manifesto />
      <Marquee />
      <TripGallery />
      <Highlights />
      <Logistics />
      <HouseRules />
      <FAQ />
      <Footer />
      {/* Reserves room so the fixed sticky CTA bar never sits over the footer's own content at max scroll */}
      <div aria-hidden="true" className="h-24 bg-desert-night md:hidden" />
      <StickyBookingBar />
    </>
  )
}
