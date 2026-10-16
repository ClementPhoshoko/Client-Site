import Container from './Container.jsx'

const links = [['Services', '#services'], ['Who we help', '#industries'], ['Contact', '#contact']]

export default function Header() {
  return <header className="site-header">
    <Container className="header-inner">
      <a className="wordmark" href="#top" aria-label="PHM Professional Services home">
        <span className="wordmark-mark" aria-hidden="true">P</span>
        <span>PHM <span className="wordmark-light">Professional Services</span></span>
      </a>
      <nav className="main-nav" aria-label="Main navigation">
        {links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
      </nav>
      <a className="button button--small header-cta" href="#contact">Talk to Us</a>
    </Container>
  </header>
}
