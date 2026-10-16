import Container from '../components/Container.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import ArrowIcon from '../components/ArrowIcon.jsx'
import { Link } from 'react-router-dom'

const groups = [
  {
    title: 'IT support & business tools',
    text: 'Day-to-day and remote support, Microsoft 365 setup and support, and professional business email.',
  },
  {
    title: 'Cloud & networking',
    text: 'Cloud solutions and reliable networking to help your people and systems work together.',
  },
  {
    title: 'Security & digital services',
    text: 'Cybersecurity, identity management and digital services shaped around your organisation.',
  },
]

export default function HomeServices() {
  return <section className="section home-services">
    <Container>
      <div className="home-services-heading" data-home-reveal>
        <SectionHeading eyebrow="Services at a glance" title="Practical support across your IT." description="From everyday help to secure cloud environments, get clear support for the technology your organisation depends on." />
        <Link className="button" to="/services">View all services <ArrowIcon /></Link>
      </div>
      <div className="home-service-grid">
        {groups.map((group, index) => <article className="home-service-card" data-home-reveal key={group.title}>
          <span className="home-service-number">0{index + 1}</span>
          <h3>{group.title}</h3>
          <p>{group.text}</p>
        </article>)}
      </div>
      <div className="home-industries-link" data-home-reveal>
        <p>Supporting schools, churches, catering businesses and small businesses.</p>
        <Link className="text-link" to="/industries">See who we support <ArrowIcon className="text-link-icon" /></Link>
      </div>
    </Container>
  </section>
}
