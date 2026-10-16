import { useLayoutEffect, useRef, useState } from 'react'

const phrases = [
  'Reliable technology.',
  'Practical solutions.',
  'IT support you can understand.',
]

function canPlayIntro() {
  return typeof window !== 'undefined'
}

export default function IntroOverlay() {
  const [shouldPlay] = useState(canPlayIntro)
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [isExiting, setIsExiting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const dialogRef = useRef(null)
  const logoRef = useRef(null)
  const timersRef = useRef([])
  const dockAnimationRef = useRef(null)

  function finishIntro() {
    timersRef.current.forEach((id) => window.clearTimeout(id))
    timersRef.current = []
    dockAnimationRef.current?.cancel()
    document.documentElement.classList.remove('intro-is-active')
    if (dialogRef.current?.open) dialogRef.current.close()
    setIsComplete(true)
  }

  useLayoutEffect(() => {
    if (!shouldPlay) return undefined

    const dialog = dialogRef.current
    const overlayLogo = logoRef.current
    const timer = (callback, delay) => {
      const id = window.setTimeout(callback, delay)
      timersRef.current.push(id)
      return id
    }

    try {
      if (typeof dialog.showModal === 'function') dialog.showModal()
      else dialog.setAttribute('open', '')
    } catch {
      // Keep the intro visible if storage or native modal support is unavailable.
      dialog.setAttribute('open', '')
    }

    document.documentElement.classList.add('intro-is-active')

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPhraseIndex(2)
      timer(finishIntro, 1000)
      return () => {
        timersRef.current.forEach((id) => window.clearTimeout(id))
        timersRef.current = []
        document.documentElement.classList.remove('intro-is-active')
        if (dialog.open) dialog.close()
      }
    }

    timer(() => setPhraseIndex(1), 480)
    timer(() => setPhraseIndex(2), 960)
    timer(() => {
      setPhraseIndex(-1)
      const headerLogo = document.querySelector('.wordmark-logo-window')
      if (!overlayLogo || !headerLogo || typeof overlayLogo.animate !== 'function') {
        setIsExiting(true)
        timer(finishIntro, 270)
        return
      }

      const start = overlayLogo.getBoundingClientRect()
      const target = headerLogo.getBoundingClientRect()
      const translateX = target.left + target.width / 2 - (start.left + start.width / 2)
      const translateY = target.top + target.height / 2 - (start.top + start.height / 2)
      const scale = target.width / start.width

      dockAnimationRef.current = overlayLogo.animate([
        { transform: 'translate(0, 0) scale(1)' },
        { transform: `translate(${translateX}px, ${translateY}px) scale(${scale})` },
      ], { duration: 680, easing: 'cubic-bezier(.22, 1, .36, 1)', fill: 'forwards' })

      dockAnimationRef.current.onfinish = () => {
        setIsExiting(true)
        timer(finishIntro, 270)
      }
    }, 1510)

    return () => {
      timersRef.current.forEach((id) => window.clearTimeout(id))
      timersRef.current = []
      dockAnimationRef.current?.cancel()
      document.documentElement.classList.remove('intro-is-active')
      if (dialog.open) dialog.close()
    }
  }, [shouldPlay])

  if (!shouldPlay || isComplete) return null

  return <dialog className={`intro-overlay${isExiting ? ' intro-overlay--exiting' : ''}`} ref={dialogRef} aria-label="PHM Professional Services introduction" onCancel={(event) => { event.preventDefault(); finishIntro() }}>
    <div className="intro-stage">
      <span className="intro-logo-window" ref={logoRef} aria-hidden="true">
        <img className="intro-logo" src="/assets/PHM%20Professional%20Services%20Logo.png" alt="" />
      </span>
      <p className={`intro-slogan${phraseIndex < 0 ? ' intro-slogan--leaving' : ''}`} aria-live="polite">
        {phraseIndex >= 0 && <span key={phraseIndex}>{phrases[phraseIndex]}</span>}
      </p>
    </div>
  </dialog>
}
