import { Link, NavLink } from 'react-router-dom'
import Container from './Container.jsx'
import ArrowIcon from './ArrowIcon.jsx'

const links = [['Services', '/services'], ['Who we help', '/industries'], ['Contact', '/contact']]

export default function Header() {
  return <header className="site-header">
    <Container className="header-inner">
      <Link className="wordmark" to="/" aria-label="PHM Professional Services home">
        <span className="wordmark-mark" aria-hidden="true">P</span>
        <span>PHM <span className="wordmark-light">Professional Services</span></span>
      </Link>
      <nav className="main-nav" aria-label="Main navigation">
        {links.map(([label, to]) => <NavLink key={to} to={to}>{label}</NavLink>)}
      </nav>
      <Link className="button button--small header-cta" to="/contact">Talk to Us <ArrowIcon diagonal /></Link>
    </Container>
  </header>
}
