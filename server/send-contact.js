import { Resend } from 'resend'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function sendContact(body, env = process.env) {
  if (!env.RESEND_API_KEY || !env.RESEND_FROM_EMAIL || !env.CONTACT_TO_EMAIL) {
    return { status: 503, payload: { message: 'The enquiry form is temporarily unavailable. Please contact us by phone or email.' } }
  }

  const name = String(body?.name ?? '').replace(/[\r\n]+/g, ' ').trim()
  const email = String(body?.email ?? '').trim()
  const organisation = String(body?.organisation ?? '').trim()
  const message = String(body?.message ?? '').trim()

  if (String(body?.website ?? '').trim()) {
    return { status: 200, payload: { message: 'Thanks for getting in touch. Your enquiry has been sent.' } }
  }

  if (!name || name.length > 120 || !emailPattern.test(email) || email.length > 254 || !message || message.length > 5000 || organisation.length > 160) {
    return { status: 400, payload: { message: 'Please check your details and try again.' } }
  }

  try {
    const resend = new Resend(env.RESEND_API_KEY)
    const { error } = await resend.emails.send({
      from: env.RESEND_FROM_EMAIL,
      to: [env.CONTACT_TO_EMAIL],
      replyTo: email,
      subject: `Website enquiry from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Organisation: ${organisation || 'Not provided'}`,
        '',
        'Enquiry:',
        message,
      ].join('\n'),
    })
    if (error) {
      console.error('Resend contact form error:', error.message)
      return { status: 502, payload: { message: 'We could not send your enquiry. Please try again or contact us by phone or email.' } }
    }
    return { status: 200, payload: { message: 'Thanks for getting in touch. Your enquiry has been sent.' } }
  } catch (error) {
    console.error('Contact form request failed:', error)
    return { status: 502, payload: { message: 'We could not send your enquiry. Please try again or contact us by phone or email.' } }
  }
}
