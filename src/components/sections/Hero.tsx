import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { fadeInOnScroll, gsap, slideIn } from '../../utils/animations'
import venue from '../../data/venue.json'

const Hero = () => {
  const { t } = useTranslation('home')
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        fadeInOnScroll(headingRef.current, { delay: 0, start: 'top bottom' })
      }
      if (subtitleRef.current) {
        fadeInOnScroll(subtitleRef.current, { delay: 0.2, start: 'top bottom' })
      }
      if (ctaRef.current) {
        slideIn(ctaRef.current, 'up', { delay: 0.4, start: 'top bottom' })
      }
    })

    return () => ctx.revert()
  }, [])

  const scrollToMenu = () => {
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center bg-sand-50 px-6"
    >
      <div className="w-full max-w-4xl mx-auto text-center">
        <h1
          ref={headingRef}
          className="font-display text-48 lg:text-72 text-driftwood"
        >
          {venue.name}
        </h1>
        <p
          ref={subtitleRef}
          className="mt-6 text-18 lg:text-24 text-driftwood"
        >
          {t('hero.subtitle')}
        </p>
        <button
          ref={ctaRef}
          type="button"
          onClick={scrollToMenu}
          className="mt-10 bg-sunset text-white rounded-12 shadow-lifted hover:shadow-glow-sunset transition-shadow duration-300 px-8 py-4 text-16 font-medium"
        >
          {t('hero.cta')}
        </button>
      </div>
    </section>
  )
}

export default Hero
