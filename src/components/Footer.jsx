import Container from './Container.jsx'

export default function Footer() {
  return <footer className="site-footer"><Container className="footer-inner">
    <div className="footer-company">
      <p>© {new Date().getFullYear()} PHM Professional Services (PTY) LTD</p>
      <p>6606 Musese Street, Birch Acres, Kempton Park, South Africa</p>
    </div>
    <address className="footer-contact">
      <a href="tel:+27733182386">+27 73 318 2386</a>
      <a href="mailto:info@phmps.co.za">info@phmps.co.za</a>
    </address>
  </Container></footer>
}
