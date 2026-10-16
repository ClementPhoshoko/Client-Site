import { useState } from 'react'
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
  const [openIndex, setOpenIndex] = useState(0)

  return <section className="home-faq section" aria-labelledby="home-faq-title">
    <Container className="faq-layout">
      <div className="faq-visual-column" data-home-reveal>
        <img className="faq-illustration" src="/assets/Modern%20Cloud%20Tech%20Ecosystem.png" alt="" loading="lazy" />
        <div className="faq-help">
          <h3>Have another question?</h3>
          <p>Talk to PHM about your organisation’s IT needs.</p>
          <Link className="text-link" to="/contact">Talk to Us <ArrowIcon className="text-link-icon" /></Link>
        </div>
      </div>
      <div className="faq-content" data-home-reveal>
        <SectionHeading titleId="home-faq-title" eyebrow="Common questions" title="A few quick answers." description="Learn about PHM’s services, support and how to get in touch." />
        <div className="faq-accordion">
          {questions.map((item, index) => {
            const isOpen = openIndex === index
            const buttonId = `home-faq-question-${index}`
            const panelId = `home-faq-answer-${index}`

            return <div className={`faq-item${isOpen ? ' is-open' : ''}`} key={item.question}>
            <h3 className="faq-item-heading"><button className="faq-question" id={buttonId} type="button" aria-expanded={isOpen} aria-controls={panelId} onClick={() => setOpenIndex(isOpen ? -1 : index)}>
              <span>{item.question}</span>
              <span className="faq-toggle" aria-hidden="true" />
            </button></h3>
            <div className="faq-panel" id={panelId} role="region" aria-labelledby={buttonId} aria-hidden={!isOpen} inert={!isOpen}>
              <div className="faq-panel-inner"><div className="faq-answer"><p>{item.answer}</p></div></div>
            </div>
          </div>})}
        </div>
      </div>
    </Container>
  </section>
}
