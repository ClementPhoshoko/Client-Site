import { Link } from 'react-router-dom'
import Container from '../components/Container.jsx'
import Hero from '../sections/Hero.jsx'
import HomeOutcomes from '../sections/HomeOutcomes.jsx'
import HomeFaq from '../sections/HomeFaq.jsx'

const links = [
  { title: 'Explore our services', copy: 'IT support, Microsoft 365, business email, cloud and security.', to: '/services' },
  { title: 'Who we work with', copy: 'Practical IT for schools, churches, small businesses and growing teams.', to: '/industries' },
]

export default function HomePage() {
  return <>
    <Hero />
    <HomeOutcomes />
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
    <HomeFaq />
  </>
}
