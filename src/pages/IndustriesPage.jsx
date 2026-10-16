import { useEffect, useRef } from 'react'
import Industries from '../sections/Industries.jsx'

export default function IndustriesPage() {
  const industriesRef = useRef(null)

  useEffect(() => {
    const root = industriesRef.current
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return

    const items = root.querySelectorAll('[data-industries-reveal]')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.remove('industries-reveal--pending')
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' })

    items.forEach((item) => {
      item.classList.add('industries-reveal--pending')
      observer.observe(item)
    })

    return () => observer.disconnect()
  }, [])

  return <div className="industries-page" ref={industriesRef}>
    <div className="page-intro page-intro--industries"><div className="container page-intro-layout">
      <div data-industries-reveal><p className="eyebrow">Who we help</p><h1>Technology support for growing teams.</h1>
        <p>Clear, dependable IT support shaped around the needs of your organisation.</p></div>
    </div></div>
    <Industries />
  </div>
}
