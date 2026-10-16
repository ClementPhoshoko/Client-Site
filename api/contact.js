import { sendContact } from '../server/send-contact.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ message: 'Method not allowed.' })
  }

  const result = await sendContact(req.body)
  return res.status(result.status).json(result.payload)
}
