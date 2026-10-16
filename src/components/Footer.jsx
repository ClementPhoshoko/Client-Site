import Container from './Container.jsx'

export default function Footer() {
  return <footer className="site-footer"><Container className="footer-inner">
    <p>© {new Date().getFullYear()} PHM Professional Services (PTY) LTD</p>
    <a href="mailto:info@phmps.co.za">info@phmps.co.za</a>
  </Container></footer>
}
