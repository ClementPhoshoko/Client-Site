import { Link } from 'react-router-dom'
import Container from '../components/Container.jsx'
import ArrowIcon from '../components/ArrowIcon.jsx'
import Seo from '../components/Seo.jsx'

export default function NotFoundPage() {
  return <section className="section"><Container>
    <Seo title="Page not found | PHM Professional Services" description="The page you are looking for could not be found." path={window.location.pathname} noindex />
    <p className="eyebrow">Page not found</p>
    <h1>We couldn’t find that page.</h1>
    <p className="section-description">Use the navigation to find the information you need.</p>
    <Link className="button" to="/">Go to home <ArrowIcon /></Link>
  </Container></section>
}
