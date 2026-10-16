import Container from '../components/Container.jsx'
import { Link } from 'react-router-dom'
import ArrowIcon from '../components/ArrowIcon.jsx'

export default function Hero() {
  return <section className="hero" id="top"><Container className="hero-inner">
    <div className="hero-copy">
      <p className="eyebrow">IT support · Cloud · Security</p>
      <h1>Technology that helps your business move forward.</h1>
      <p className="hero-description">As a growing technology provider, we help businesses and organisations simplify IT, work securely and improve productivity. Founded from a vision in 2022, PHM brings over seven years of hands-on IT experience and a focus on practical solutions and dependable, long-term client relationships.</p>
      <div className="hero-actions"><Link className="button" to="/contact">Talk to Us <ArrowIcon diagonal /></Link><Link className="text-link" to="/services">Explore our services <ArrowIcon className="text-link-icon" /></Link></div>
      <p className="hero-note">Based in Kempton Park, supporting teams near and far.</p>
    </div>
    <aside className="hero-aside"><p className="hero-aside-label">Your technology partner</p><div className="hero-aside-rule" />
      <p>Reliable technology, practical solutions and IT support you can understand.</p><span className="hero-aside-link">Serving Kempton Park and beyond</span>
    </aside>
  </Container></section>
}
