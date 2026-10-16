import { useEffect, useRef } from 'react'
import Contact from '../sections/Contact.jsx'
import Seo from '../components/Seo.jsx'
import { seoPages } from '../seo.js'

export default function ContactPage() {
  const contactRef = useRef(null)

  useEffect(() => {
    const root = contactRef.current
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return

    const items = root.querySelectorAll('[data-contact-reveal]')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.remove('contact-reveal--pending')
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' })

    items.forEach((item) => {
      item.classList.add('contact-reveal--pending')
      observer.observe(item)
    })

    return () => observer.disconnect()
  }, [])

  return <div className="contact-page" ref={contactRef}>
    <Seo {...seoPages.contact} />
    <div className="page-intro page-intro--contact"><div className="container page-intro-layout">
      <div data-contact-reveal><p className="eyebrow">Talk to Us</p><h1>Tell us how we can help.</h1>
        <p>Send an enquiry and we’ll get back to you to discuss a practical next step.</p></div>
    </div></div>
    <Contact />
  </div>
}
