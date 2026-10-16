import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Container from './Container.jsx'
import ArrowIcon from './ArrowIcon.jsx'

const links = [['Services', '/services', 'services'], ['Who we help', '/industries', 'people'], ['Contact', '/contact', 'contact']]

function NavIcon({ name }) {
  const paths = {
    services: <><path d="M3.5 8h17v12h-17z" /><path d="M8 8V5.5h8V8M3.5 12h17M10 12v2h4v-2" /></>,
    people: <><circle cx="9" cy="8" r="3" /><path d="M3.5 19v-1.5a5.5 5.5 0 0 1 11 0V19zM16 5.5a3 3 0 0 1 0 5.8M17 14a4.5 4.5 0 0 1 3.5 4.4V19h-3" /></>,
    contact: <><path d="M4 5.5h16v11H11l-5.5 3v-3H4z" /><path d="M8 10h8M8 13h5" /></>,
  }

  return <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">{paths[name]}</svg>
}

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
        {links.map(([label, to, icon]) => <NavLink key={to} to={to} onClick={closeMenu}><NavIcon name={icon} /><span>{label}</span></NavLink>)}
      </nav>
      <Link className="button button--small header-cta" to="/contact" onClick={closeMenu}>Talk to Us <ArrowIcon diagonal /></Link>
      <button className="nav-toggle" type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen((open) => !open)}>
        <span className="nav-toggle-lines" aria-hidden="true"><span /><span /><span /></span>
      </button>
    </Container>
  </header>
}
