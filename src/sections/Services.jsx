import Container from '../components/Container.jsx'
import SectionHeading from '../components/SectionHeading.jsx'

const services = [
  ['IT support', 'Responsive day-to-day help, including remote support, to keep your people working.'],
  ['Microsoft 365', 'Setup, configuration and ongoing support for the tools your team uses every day.'],
  ['Professional email', 'Business email configured to help your team communicate clearly and professionally.'],
  ['Cloud solutions', 'Practical cloud setup and guidance that supports flexible, dependable work.'],
  ['Networking', 'Reliable network planning and support to connect your people and locations.'],
  ['Cybersecurity', 'Straightforward steps to reduce risk and protect your organisation’s digital environment.'],
  ['Identity management', 'Manage access so the right people can securely reach the tools they need.'],
  ['Digital services', 'Technology assistance tailored to the way your organisation operates.'],
]

export default function Services() {
  return <section className="section" id="services"><Container>
    <SectionHeading eyebrow="What we do" title="IT that works for the way you work." description="From everyday support to a more secure cloud setup, we help simplify technology and make it work harder for your organisation." />
    <div className="service-grid">{services.map(([title, text], index) => <article className="service-card" key={title}>
      <span className="service-number">{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{text}</p>
    </article>)}</div>
  </Container></section>
}
