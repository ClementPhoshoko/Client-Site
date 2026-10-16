# PHM Professional Services (PTY) LTD

Project brief and development guide for the PHM Professional Services website.

## Project overview

PHM Professional Services is an IT and technology solutions provider based in Birch Acres, Kempton Park, South Africa. The website should explain the company's practical, business-focused services and make it straightforward for prospective clients to get in touch.

The company was established from a vision in 2022 and brings over seven years of hands-on IT experience. Its commitment is:

> Reliable technology, practical solutions and IT support you can understand.

## Technology

- **Vite** for the development server and production build
- **React** with **JSX** for the user interface
- **JavaScript** (not TypeScript)

The repository uses a Vite React JavaScript scaffold. Use the package scripts supplied by that scaffold:

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Project structure

```text
src/
  components/  shared layout and content components
  sections/    page content: hero, home outcomes, services preview and FAQs, services, industries, contact
  pages/       Home, Services, Industries, Contact, and not-found routes
  server/      shared server-side Resend mail handler
  styles/      shared design tokens and global responsive styles
  App.jsx      homepage composition
  main.jsx     React entry point
public/assets/
  company logo, transparent illustrations, and workspace photography
```

The site uses focused Home, Services, Industries, and Contact pages. It has no About or Our Story page. Shared color values live in `src/styles/tokens.css`.

## Contact form configuration

The contact form sends submissions to the Vercel serverless function in `api/contact.js`. That function uses Resend, keeping `RESEND_API_KEY` on the server rather than exposing it in browser code.

1. Create a Resend account, verify a sending domain, and create an API key.
2. Copy `.env.example` to `.env` and set `RESEND_API_KEY`, `RESEND_FROM_EMAIL` (an address on the verified domain), and `CONTACT_TO_EMAIL`.
3. Run `npm run dev`. The Vite development server provides the same `/api/contact` endpoint locally.
4. For Vercel deployment, add those three variables in the project's Environment Variables settings. Do not use a `VITE_` prefix for secrets.

The form validates required fields, has a honeypot field for basic bot filtering, and displays success and error feedback. Keep `.env` out of version control.

## Website requirements

### Main content

Present PHM as a growing technology provider that helps businesses and organisations simplify IT, improve productivity, and establish reliable and secure digital working environments. Keep the language approachable and understandable, and focus on practical solutions and dependable, long-term client relationships.

Include the following services:

- IT support, including remote support
- Microsoft 365 setup and support
- Professional business email
- Cloud solutions
- Networking
- Cybersecurity
- Identity management
- Digital services

The client has asked to remove equipment rental/finance, video conferencing, internet connectivity, and software and hardware sales/support from the services offering.

### Industries

Include schools, churches, catering businesses, and other small businesses, including construction and engineering firms. Non-profit organisations and professional services providers may also be included in supporting copy.

### Contact and support

Show the following contact details consistently wherever contact information appears:

- **Phone:** +27 73 318 2386
- **Email:** [info@phmps.co.za](mailto:info@phmps.co.za)
- **Address:** 6606 Musese Street, Birch Acres, Kempton Park, South Africa

Include a contact form so visitors can submit an enquiry and PHM can receive it by email. The form needs a real email-delivery integration (for example, a server-side endpoint or a suitable form service); a front-end-only form cannot deliver email. Select and configure that integration during implementation, keep credentials out of browser code, and provide clear success and error feedback to visitors.

### Explicit exclusions

Do not add:

- An About or Our Story section/page
- Testimonials or “What clients say”
- Client logos, names, or a client list
- A downloadable company profile
- Careers or Resources sections
- A Microsoft Partner claim or badge
- LinkedIn, Twitter/X, or Facebook links
- A newsletter signup

Use **“Talk to Us”** as the primary contact call to action.

## Design direction

Use a light theme and a clean, restrained interface informed by GitHub's light-mode design patterns: clear hierarchy, readable typography, generous whitespace, subtle borders, simple surfaces, and accessible interactive states. This is a visual direction only; do not copy GitHub branding, logos, or distinctive assets. no weird glowing stuff just nice clean corprate ui like Uber and other PTY LTD companies.

The planned design tokens are:

```css
:root {
  /* Brand */
  --color-brand-primary: #0D1B30;
  --color-brand-accent: #148BE1;

  /* Light theme */
  --color-background: #FFFFFF;
  --color-background-secondary: #F3F7FB;
  --color-surface: #FFFFFF;

  /* Typography */
  --color-text-primary: #0D1B30;
  --color-text-secondary: #64748B;

  /* UI */
  --color-border: #E2E8F0;
  --color-button-primary: #148BE1;
  --color-button-hover: #1177C5;
  --color-focus-ring: #148BE1;
}
```

When the application is built, move these values into a shared stylesheet or design-token file and use the tokens consistently rather than scattering color values across components. Maintain sufficient contrast, visible keyboard focus, semantic HTML, and responsive layouts.

## Implementation notes

- Keep the page content aligned with the client-provided scope above; do not invent customers, partnerships, testimonials, or additional services.
- Keep contact details easy to find on desktop and mobile.
- Make the contact form labels, validation, submission state, and error handling accessible.
- Do not expose email-service credentials or other secrets in client-side code.
- Add project-specific setup, environment-variable, and deployment instructions here once the application and email integration have been chosen.
