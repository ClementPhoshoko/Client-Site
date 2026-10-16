import Services from '../sections/Services.jsx'

export default function ServicesPage() {
  return <>
    <div className="page-intro"><div className="container page-intro-layout">
      <div><p className="eyebrow">PHM services</p><h1>Practical IT support for your organisation.</h1>
        <p>From everyday assistance to cloud and cybersecurity, get the right support to keep work moving.</p></div>
      <div className="intro-art intro-art--cloud"><img src="/assets/Modern%20Cloud%20Tech%20Ecosystem.png" alt="" loading="lazy" /></div>
    </div></div>
    <Services />
  </>
}
