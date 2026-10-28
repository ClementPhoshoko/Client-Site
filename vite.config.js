import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { sendContact } from './server/send-contact.js'
import { seoPages } from './src/seo.js'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

function searchMetadataPlugin(siteOrigin) {
  const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character])

  return {
    name: 'search-metadata-files',
    closeBundle() {
      const outputDirectory = join(process.cwd(), 'dist')
      const indexPath = join(outputDirectory, 'index.html')
      const originalHtml = readFileSync(indexPath, 'utf8')
      const logoUrl = siteOrigin ? `${siteOrigin}/assets/PHM%20Professional%20Services%20Logo.png` : ''
      const socialImageUrl = siteOrigin ? `${siteOrigin}/assets/Modern%20Minimalist%20Office%20Workspace.png` : ''

      const buildPageHtml = (page, { noindex = false, includeBusinessSchema = false } = {}) => {
        let html = originalHtml
          .replace(/<title>.*?<\/title>/i, `<title>${escapeHtml(page.title)}</title>`)
          .replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?\s*>/i, `<meta name="description" content="${escapeHtml(page.description)}" />`)

        const canonicalUrl = siteOrigin && page.path ? `${siteOrigin}${page.path}` : ''
        const tags = [
          `<meta property="og:type" content="website" />`,
          `<meta property="og:site_name" content="PHM Professional Services" />`,
          `<meta property="og:title" content="${escapeHtml(page.title)}" />`,
          `<meta property="og:description" content="${escapeHtml(page.description)}" />`,
          `<meta name="twitter:card" content="summary_large_image" />`,
          `<meta name="twitter:title" content="${escapeHtml(page.title)}" />`,
          `<meta name="twitter:description" content="${escapeHtml(page.description)}" />`,
        ]
        if (canonicalUrl) tags.push(`<link rel="canonical" href="${escapeHtml(canonicalUrl)}" />`, `<meta property="og:url" content="${escapeHtml(canonicalUrl)}" />`)
        if (socialImageUrl) tags.push(`<meta property="og:image" content="${escapeHtml(socialImageUrl)}" />`, '<meta property="og:image:alt" content="PHM Professional Services workplace and technology" />', `<meta name="twitter:image" content="${escapeHtml(socialImageUrl)}" />`)
        if (noindex) tags.push('<meta name="robots" content="noindex,follow" />')

        if (includeBusinessSchema && siteOrigin) {
          const schema = {
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            '@id': `${siteOrigin}/#business`,
            name: 'PHM Professional Services (PTY) LTD',
            url: `${siteOrigin}/`,
            image: socialImageUrl,
            logo: logoUrl,
            telephone: '+27733182386',
            email: 'information@phmps.co.za',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '6606 Musese Street, Birch Acres',
              addressLocality: 'Kempton Park',
              addressCountry: 'ZA',
            },
            areaServed: { '@type': 'City', name: 'Kempton Park' },
          }
          tags.push(`<script type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script>`)
        }

        return html.replace('</head>', `${tags.join('\n    ')}\n  </head>`)
      }

      writeFileSync(indexPath, buildPageHtml(seoPages.home, { includeBusinessSchema: true }))
      for (const key of ['services', 'industries', 'contact']) {
        const routeDirectory = join(outputDirectory, seoPages[key].path.slice(1))
        mkdirSync(routeDirectory, { recursive: true })
        writeFileSync(join(routeDirectory, 'index.html'), buildPageHtml(seoPages[key]))
      }

      writeFileSync(join(outputDirectory, '404.html'), buildPageHtml({ path: null, title: 'Page not found | PHM Professional Services', description: 'The page you are looking for could not be found.' }, { noindex: true }))

      if (siteOrigin) {
        const sitemapUrls = Object.values(seoPages).map((page) => `  <url><loc>${escapeHtml(`${siteOrigin}${page.path}`)}</loc></url>`).join('\n')
        writeFileSync(join(outputDirectory, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls}\n</urlset>\n`)
        writeFileSync(join(outputDirectory, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${siteOrigin}/sitemap.xml\n`)
      } else {
        writeFileSync(join(outputDirectory, 'robots.txt'), 'User-agent: *\nAllow: /\nDisallow: /api/\n')
      }
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = { ...process.env, ...loadEnv(mode, process.cwd(), '') }
  const configuredSiteOrigin = env.SITE_URL || env.VITE_SITE_URL
  const vercelProductionDomain = env.VERCEL_PROJECT_PRODUCTION_URL || env.VITE_VERCEL_PROJECT_PRODUCTION_URL
  const siteOrigin = (configuredSiteOrigin || (vercelProductionDomain ? `https://${vercelProductionDomain}` : '')).replace(/\/$/, '')

  return {
    define: { 'import.meta.env.VITE_SITE_URL': JSON.stringify(siteOrigin) },
    plugins: [react(), searchMetadataPlugin(siteOrigin), {
      name: 'local-contact-function',
      configureServer(server) {
        server.middlewares.use('/api/contact', async (req, res) => {
          res.setHeader('Content-Type', 'application/json')
          if (req.method !== 'POST') {
            res.statusCode = 405
            res.setHeader('Allow', 'POST')
            res.end(JSON.stringify({ message: 'Method not allowed.' }))
            return
          }

          try {
            let rawBody = ''
            for await (const chunk of req) rawBody += chunk
            const body = JSON.parse(rawBody || '{}')
            const result = await sendContact(body, env)
            res.statusCode = result.status
            res.end(JSON.stringify(result.payload))
          } catch {
            res.statusCode = 400
            res.end(JSON.stringify({ message: 'Please check your details and try again.' }))
          }
        })
      },
    }],
  }
})
