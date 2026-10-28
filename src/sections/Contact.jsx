import { useState } from 'react'
import Container from '../components/Container.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import ArrowIcon from '../components/ArrowIcon.jsx'

export default function Contact() {
  const [status, setStatus] = useState('idle')
  const [feedback, setFeedback] = useState('Your details will only be used to respond to your enquiry.')

  async function handleSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    setStatus('sending')
    try {
      const formData = new FormData(form)
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      })
      const result = await response.json().catch(() => null)
      if (!response.ok) {
        console.error(`Contact form endpoint returned HTTP ${response.status}.`)
        setStatus('error')
        setFeedback(result?.message || 'We could not send your enquiry. Please try again or use the full contact details listed alongside this form.')
        return
      }
      form.reset()
      setStatus('success')
      setFeedback(result.message || 'Thanks for getting in touch. Your enquiry has been sent.')
    } catch (error) {
      console.error('Contact form request could not reach the endpoint:', error)
      setStatus('error')
      setFeedback('We could not send your enquiry. Please try again or use the full contact details listed alongside this form.')
    }
  }

  return <section className="section contact-section" id="contact"><Container className="contact-layout">
    <div className="contact-copy contact-copy--enter">
      <SectionHeading eyebrow="Get in touch" title="Let’s make IT work better for you." description="Tell us what your organisation needs. We’ll be happy to talk through a practical next step." />
      <dl className="contact-details">
        <div><dt>Phone</dt><dd><a href="tel:+27733182386">+27 73 318 2386</a></dd></div>
        <div><dt>Email</dt><dd><a href="mailto:information@phmps.co.za">information@phmps.co.za</a></dd></div>
        <div><dt>Address</dt><dd>6606 Musese Street, Birch Acres,<br />Kempton Park, South Africa</dd></div>
      </dl>
    </div>
    <form className="contact-form contact-form--enter" onSubmit={handleSubmit}>
      <div className="form-trap" aria-hidden="true"><label htmlFor="website">Leave this field empty</label><input id="website" name="website" tabIndex="-1" autoComplete="off" /></div>
      <div className="form-row"><label htmlFor="name">Your name</label><input id="name" name="name" autoComplete="name" required /></div>
      <div className="form-row"><label htmlFor="email">Work email</label><input id="email" name="email" type="email" autoComplete="email" required /></div>
      <div className="form-row"><label htmlFor="organisation">Organisation <span>(optional)</span></label><input id="organisation" name="organisation" autoComplete="organization" /></div>
      <div className="form-row"><label htmlFor="message">How can we help?</label><textarea id="message" name="message" rows="4" required /></div>
      <button className="button" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : <>Send enquiry <ArrowIcon /></>}</button>
      <p className={`form-feedback form-feedback--${status}`} role="status" aria-live="polite">{feedback}</p>
    </form>
  </Container></section>
}
