import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { sendContact } from './server/send-contact.js'

export default defineConfig(({ mode }) => {
  const env = { ...process.env, ...loadEnv(mode, process.cwd(), '') }

  return {
    plugins: [react(), {
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
