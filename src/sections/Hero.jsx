import Container from '../components/Container.jsx'

export default function Hero() {
  return <section className="hero" id="top"><Container className="hero-inner">
    <div className="hero-copy">
      <p className="eyebrow">IT support · Cloud · Security</p>
      <h1>Technology that helps your business move forward.</h1>
      <p className="hero-description">Straightforward IT support and practical technology solutions for businesses and organisations. We make it easier to work securely, stay productive and plan for what’s next.</p>
      <div className="hero-actions"><a className="button" href="#contact">Talk to Us</a><a className="text-link" href="#services">Explore our services <span aria-hidden="true">→</span></a></div>
      <p className="hero-note">Based in Kempton Park, supporting teams near and far.</p>
    </div>
    <aside className="hero-aside"><p className="hero-aside-label">Your technology partner</p><div className="hero-aside-rule" />
      <p>Reliable technology, practical solutions and IT support you can understand.</p><a href="tel:+27733182386">+27 73 318 2386</a>
    </aside>
  </Container></section>
}
