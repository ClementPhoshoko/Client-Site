import { useEffect, useRef } from 'react'
import Hero from '../sections/Hero.jsx'
import HomeOutcomes from '../sections/HomeOutcomes.jsx'
import HomeFaq from '../sections/HomeFaq.jsx'
import HomeServices from '../sections/HomeServices.jsx'

export default function HomePage() {
  const homeRef = useRef(null)

  useEffect(() => {
    const root = homeRef.current
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return

    const elements = root.querySelectorAll('[data-home-reveal]')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.remove('home-reveal--pending')
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' })

    elements.forEach((element) => {
      element.classList.add('home-reveal--pending')
      observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  return <div className="home-page" ref={homeRef}>
    <Hero />
    <HomeOutcomes />
    <HomeServices />
    <HomeFaq />
  </div>
}
