import Contact from '../sections/Contact.jsx'

export default function ContactPage() {
  return <>
    <div className="page-intro"><div className="container page-intro-layout">
      <div><p className="eyebrow">Talk to Us</p><h1>Tell us how we can help.</h1>
        <p>Send an enquiry and we’ll get back to you to discuss a practical next step.</p></div>
      <div className="contact-photo"><img src="/assets/Modern%20Minimalist%20Office%20Workspace.png" alt="" loading="lazy" /></div>
    </div></div>
    <Contact />
  </>
}
