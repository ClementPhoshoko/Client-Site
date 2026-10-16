import { useEffect, useRef } from 'react'
import Services from '../sections/Services.jsx'
import Seo from '../components/Seo.jsx'
import { seoPages } from '../seo.js'

export default function ServicesPage() {
  const servicesRef = useRef(null)

  useEffect(() => {
    const root = servicesRef.current
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return

    const items = root.querySelectorAll('[data-services-reveal]')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.remove('services-reveal--pending')
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' })

    items.forEach((item) => {
      item.classList.add('services-reveal--pending')
      observer.observe(item)
    })

    return () => observer.disconnect()
  }, [])

  return <div className="services-page" ref={servicesRef}>
    <Seo {...seoPages.services} />
    <div className="page-intro"><div className="container page-intro-layout">
      <div data-services-reveal><p className="eyebrow">PHM services</p><h1>Practical IT support for your organisation.</h1>
        <p>From everyday assistance to cloud and cybersecurity, get the right support to keep work moving.</p></div>
      <div className="intro-art intro-art--cloud" data-services-reveal><img src="/assets/Modern%20Cloud%20Tech%20Ecosystem.png" alt="" loading="lazy" /></div>
    </div></div>
    <Services />
  </div>
}
