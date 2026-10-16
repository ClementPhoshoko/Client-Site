import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Container from './Container.jsx'
import ArrowIcon from './ArrowIcon.jsx'

const links = [['Services', '/services'], ['Who we help', '/industries'], ['Contact', '/contact']]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  return <header className="site-header" onKeyDown={(event) => {
    if (event.key === 'Escape' && menuOpen) {
      closeMenu()
      event.currentTarget.querySelector('.nav-toggle')?.focus()
    }
  }}>
    <Container className="header-inner">
      <Link className="wordmark" to="/" aria-label="PHM Professional Services home" onClick={closeMenu}>
        <span className="wordmark-logo-window">
          <img className="wordmark-logo" src="/assets/PHM%20Professional%20Services%20Logo.png" alt="PHM Professional Services" />
        </span>
      </Link>
      <nav className={`main-nav${menuOpen ? ' main-nav--open' : ''}`} id="main-navigation" aria-label="Main navigation">
        {links.map(([label, to]) => <NavLink key={to} to={to} onClick={closeMenu}>{label}</NavLink>)}
      </nav>
      <Link className="button button--small header-cta" to="/contact" onClick={closeMenu}>Talk to Us <ArrowIcon diagonal /></Link>
      <button className="nav-toggle" type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen((open) => !open)}>
        <span className="nav-toggle-lines" aria-hidden="true"><span /><span /><span /></span>
      </button>
    </Container>
  </header>
}
