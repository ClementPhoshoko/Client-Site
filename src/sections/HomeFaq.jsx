import Container from '../components/Container.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import ArrowIcon from '../components/ArrowIcon.jsx'
import { Link } from 'react-router-dom'

const questions = [
  {
    question: 'What services does PHM provide?',
    answer: 'IT support, Microsoft 365 setup and support, professional business email, cloud solutions, networking, cybersecurity, identity management and digital services.',
  },
  {
    question: 'Can PHM provide remote IT support?',
    answer: 'Yes. Remote support is included in PHM’s IT support offering.',
  },
  {
    question: 'Which organisations can PHM support?',
    answer: 'PHM’s services are suited to schools, churches, catering businesses and small businesses, including construction and engineering firms. Non-profits and professional services providers may also be supported.',
  },
  {
    question: 'How can I contact PHM?',
    answer: <>
      <a href="tel:+27733182386">+27 73 318 2386</a><br />
      <a href="mailto:info@phmps.co.za">info@phmps.co.za</a><br />
      6606 Musese Street, Birch Acres, Kempton Park, South Africa.
    </>,
  },
]

export default function HomeFaq() {
  return <section className="home-faq section" aria-labelledby="home-faq-title">
    <Container className="faq-layout">
      <div className="faq-visual-column">
        <img className="faq-illustration" src="/assets/Modern%20Cloud%20Tech%20Ecosystem.png" alt="" loading="lazy" />
        <div className="faq-help">
          <h3>Have another question?</h3>
          <p>Talk to PHM about your organisation’s IT needs.</p>
          <Link className="text-link" to="/contact">Talk to Us <ArrowIcon className="text-link-icon" /></Link>
        </div>
      </div>
      <div className="faq-content">
        <SectionHeading titleId="home-faq-title" eyebrow="Common questions" title="A few quick answers." description="Learn about PHM’s services, support and how to get in touch." />
        <div className="faq-accordion">
          {questions.map((item, index) => <details className="faq-item" name="phm-home-faq" key={item.question} open={index === 0}>
            <summary className="faq-question">
              <span>{item.question}</span>
              <span className="faq-toggle" aria-hidden="true" />
            </summary>
            <div className="faq-answer"><p>{item.answer}</p></div>
          </details>)}
        </div>
      </div>
    </Container>
  </section>
}
