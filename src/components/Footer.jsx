import Container from './Container.jsx'
import { Link } from 'react-router-dom'

export default function Footer() {
  return <footer className="site-footer"><Container className="footer-inner">
    <div className="footer-top">
      <Link className="footer-logo-link" to="/" aria-label="PHM Professional Services home">
        <span className="footer-logo-window"><img src="/assets/PHM%20Professional%20Services%20Logo.png" alt="" /></span>
      </Link>
      <address className="footer-details">
        <div><span>Phone</span><a href="tel:+27733182386">+27 73 318 2386</a></div>
        <div><span>Email</span><a href="mailto:info@phmps.co.za">info@phmps.co.za</a></div>
        <div><span>Address</span><p>6606 Musese Street, Birch Acres,<br />Kempton Park, South Africa</p></div>
      </address>
    </div>
    <div className="footer-bottom">
      <p>© {new Date().getFullYear()} PHM Professional Services (PTY) LTD</p>
      <Link to="/contact">Talk to Us <span aria-hidden="true">↗</span></Link>
    </div>
  </Container></footer>
}
