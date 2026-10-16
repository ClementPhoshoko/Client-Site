export default function ArrowIcon({ diagonal = false, className = 'button-icon' }) {
  return diagonal
    ? <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false"><path d="M7 17 17 7M7 7h10v10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
    : <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false"><path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
}
