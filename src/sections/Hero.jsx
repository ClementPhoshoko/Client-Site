import Container from '../components/Container.jsx'
import { Link } from 'react-router-dom'
import ArrowIcon from '../components/ArrowIcon.jsx'

export default function Hero() {
  return <section className="hero" id="top"><Container className="hero-inner">
    <div className="hero-copy">
      <p className="eyebrow">IT support · Cloud · Security</p>
      <h1>Technology that helps your business move forward.</h1>
      <p className="hero-description">As a growing technology provider, PHM helps businesses and organisations simplify IT, improve productivity and build reliable, secure digital working environments.</p>
      <div className="hero-actions"><Link className="button" to="/contact">Talk to Us <ArrowIcon diagonal /></Link><Link className="text-link" to="/services">Explore our services <ArrowIcon className="text-link-icon" /></Link></div>
      <p className="hero-note">Founded from a vision in 2022, with more than seven years of hands-on IT experience.</p>
    </div>
  </Container></section>
}
