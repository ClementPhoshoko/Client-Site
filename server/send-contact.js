import { Resend } from 'resend'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[character])
}

function buildContactEmail({ name, email, organisation, message }, siteUrl) {
  const safeName = escapeHtml(name)
  const safeEmail = escapeHtml(email)
  const safeOrganisation = escapeHtml(organisation || 'Not provided')
  const safeMessage = escapeHtml(message)
  const logoUrl = `${siteUrl.replace(/\/$/, '')}/assets/PHM%20Professional%20Services%20Logo.png`

  return `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:0;background-color:transparent;color:#17263b;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:transparent;">
      <tr><td align="center" style="padding:32px 18px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:620px;background-color:transparent;">
          <tr><td style="padding:0 0 26px;">
            <img src="${logoUrl}" width="168" alt="PHM Professional Services" style="display:block;width:168px;max-width:100%;height:auto;">
            <p style="margin:16px 0 0;color:#53657b;font-size:13px;line-height:1.6;">Reliable technology. Practical solutions. IT support you can understand.</p>
          </td></tr>
          <tr><td style="padding:0 0 10px;">
            <h1 style="margin:0;color:#10243d;font-size:30px;line-height:1.2;font-weight:700;letter-spacing:-.5px;">New website enquiry</h1>
            <p style="margin:12px 0 0;color:#53657b;font-size:14px;line-height:1.65;">A visitor sent a message through the PHM Professional Services contact form.</p>
          </td></tr>
          <tr><td style="padding:12px 0 0;color:#26384e;font-size:14px;line-height:1.7;">
            <p style="margin:0 0 8px;"><strong>Name:</strong> ${safeName}</p>
            <p style="margin:0 0 8px;"><strong>Email:</strong> <a href="mailto:${safeEmail}" style="color:#176fc1;text-decoration:none;">${safeEmail}</a></p>
            <p style="margin:0 0 20px;"><strong>Organisation:</strong> ${safeOrganisation}</p>
            <p style="margin:0;color:#26384e;font-size:14px;line-height:1.75;white-space:pre-wrap;">${safeMessage}</p>
          </td></tr>
          <tr><td style="padding:28px 0 16px;"><hr style="height:0;border:0;border-top:1px solid #dbe3ec;margin:0;"></td></tr>
          <tr><td style="color:#64748b;font-size:12px;line-height:1.7;">
            <p style="margin:0 0 4px;color:#26384e;font-weight:600;">PHM Professional Services</p>
            <p style="margin:0;"><a href="mailto:information@phmps.co.za" style="color:#53657b;text-decoration:none;">information@phmps.co.za</a> &nbsp;·&nbsp; +27 73 318 2386</p>
            <p style="margin:4px 0 0;">6606 Musese Street, Birch Acres, Kempton Park, South Africa</p>
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`
}

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
    const siteUrl = env.SITE_URL || 'https://phmps.co.za'
    const { error } = await resend.emails.send({
      from: env.RESEND_FROM_EMAIL,
      to: [env.CONTACT_TO_EMAIL],
      replyTo: email,
      subject: `Website enquiry from ${name}`,
      html: buildContactEmail({ name, email, organisation, message }, siteUrl),
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
