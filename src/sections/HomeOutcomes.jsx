import Container from '../components/Container.jsx'
import SectionHeading from '../components/SectionHeading.jsx'

const outcomes = [
  {
    title: 'Clear advice',
    text: 'Understand your options and choose a practical next step for your organisation.',
  },
  {
    title: 'A setup that fits',
    text: 'Align cloud services, accounts and security with the way your team works.',
  },
  {
    title: 'Support over time',
    text: 'Build a dependable long-term relationship that adapts as your organisation changes.',
  },
]

export default function HomeOutcomes() {
  return <section className="home-outcomes section">
    <Container>
      <div data-home-reveal><SectionHeading eyebrow="The PHM commitment" title="Reliable technology, practical solutions and IT support you can understand." /></div>
      <div className="home-outcomes-grid">
        {outcomes.map((outcome, index) => <article className="home-outcome" data-home-reveal key={outcome.title}>
          <span className="home-outcome-index">0{index + 1}</span>
          <h3>{outcome.title}</h3>
          <p>{outcome.text}</p>
        </article>)}
      </div>
    </Container>
  </section>
}
