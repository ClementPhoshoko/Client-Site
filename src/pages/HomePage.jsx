import { useEffect, useRef } from 'react'
import Hero from '../sections/Hero.jsx'
import HomeOutcomes from '../sections/HomeOutcomes.jsx'
import HomeFaq from '../sections/HomeFaq.jsx'
import HomeServices from '../sections/HomeServices.jsx'
import Seo from '../components/Seo.jsx'
import { seoPages } from '../seo.js'

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

    const sections = [...root.querySelectorAll(':scope > section')]
    const sectionVisibility = new Map()
    const focusObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => sectionVisibility.set(entry.target, entry.intersectionRatio))
      const focusedSection = [...sectionVisibility.entries()]
        .filter(([, ratio]) => ratio > 0)
        .sort((a, b) => b[1] - a[1])[0]?.[0]

      sections.forEach((section) => section.classList.toggle('home-section--focused', section === focusedSection))
    }, { threshold: [0, 0.2, 0.4, 0.6, 0.8, 1] })

    sections.forEach((section) => focusObserver.observe(section))

    return () => {
      observer.disconnect()
      focusObserver.disconnect()
    }
  }, [])

  return <div className="home-page" ref={homeRef}>
    <Seo {...seoPages.home} />
    <Hero />
    <HomeOutcomes />
    <HomeServices />
    <HomeFaq />
  </div>
}
