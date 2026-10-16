import { Link } from 'react-router-dom'
import Container from '../components/Container.jsx'
import Hero from '../sections/Hero.jsx'

const links = [
  { title: 'Explore our services', copy: 'IT support, Microsoft 365, cloud, security and more.', to: '/services' },
  { title: 'Who we work with', copy: 'Practical IT for schools, churches, small businesses and growing teams.', to: '/industries' },
]

export default function HomePage() {
  return <>
    <Hero />
    <section className="section home-paths">
      <Container>
        <div className="home-path-grid">
          {links.map((item) => <Link className="home-path-card" to={item.to} key={item.to}>
            <span className="eyebrow">PHM Professional Services</span>
            <h2>{item.title}</h2>
            <p>{item.copy}</p>
            <span className="home-path-arrow" aria-hidden="true">→</span>
          </Link>)}
        </div>
      </Container>
    </section>
  </>
}
