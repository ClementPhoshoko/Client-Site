import { useEffect } from 'react'

function setMeta(attribute, key, content) {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.append(element)
  }
  element.setAttribute('content', content)
}

function getSiteOrigin() {
  const configuredOrigin = import.meta.env.VITE_SITE_URL
  const vercelProductionDomain = import.meta.env.VITE_VERCEL_PROJECT_PRODUCTION_URL
  const origin = configuredOrigin || (vercelProductionDomain ? `https://${vercelProductionDomain}` : window.location.origin)
  return new URL(origin).origin
}

export default function Seo({ title, description, path, noindex = false }) {
  useEffect(() => {
    const origin = getSiteOrigin()
    const canonicalUrl = noindex ? null : new URL(path, `${origin}/`).href
    const imageUrl = new URL('/assets/Modern%20Minimalist%20Office%20Workspace.png', `${origin}/`).href
    const previousTitle = document.title
    const robotsMeta = document.head.querySelector('meta[name="robots"]')
    const previousRobots = robotsMeta?.getAttribute('content')
    if (canonicalUrl) {
      const canonical = document.head.querySelector('link[rel="canonical"]') || document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      canonical.setAttribute('href', canonicalUrl)
      document.head.append(canonical)
    } else {
      document.head.querySelector('link[rel="canonical"]')?.remove()
    }
    document.title = title

    setMeta('name', 'description', description)
    setMeta('property', 'og:type', 'website')
    setMeta('property', 'og:site_name', 'PHM Professional Services')
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    if (canonicalUrl) setMeta('property', 'og:url', canonicalUrl)
    else document.head.querySelector('meta[property="og:url"]')?.remove()
    setMeta('property', 'og:image', imageUrl)
    setMeta('property', 'og:image:alt', 'PHM Professional Services workplace and technology')
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:image', imageUrl)

    if (noindex) setMeta('name', 'robots', 'noindex,follow')
    else if (robotsMeta) robotsMeta.remove()

    return () => {
      document.title = previousTitle
      if (previousRobots !== null && previousRobots !== undefined) setMeta('name', 'robots', previousRobots)
      else if (noindex) document.head.querySelector('meta[name="robots"]')?.remove()
    }
  }, [title, description, path, noindex])

  return null
}
