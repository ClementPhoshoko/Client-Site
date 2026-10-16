import Container from '../components/Container.jsx'
import SectionHeading from '../components/SectionHeading.jsx'

const industries = ['Schools', 'Churches', 'Catering businesses', 'Construction & engineering', 'Small businesses', 'Non-profits & professional services']

export default function Industries() {
  return <section className="section section--muted" id="industries"><Container className="industries-layout">
    <div data-industries-reveal><SectionHeading eyebrow="Who we help" title="Good technology should fit your organisation." description="We work with growing teams that need dependable IT and clear, practical guidance—without making technology more complicated than it needs to be." /></div>
    <ul className="industry-list">{industries.map((industry) => <li data-industries-reveal key={industry}><span aria-hidden="true">↗</span>{industry}</li>)}</ul>
  </Container></section>
}
