import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { fadeInOnScroll, slideIn } from '../../utils/animations'
import venue from '../../data/venue.json'

type VenueLanguage = keyof typeof venue.description

function resolveDescription(language: string): string {
  const code = language.slice(0, 2) as VenueLanguage
  return venue.description[code] ?? venue.description.it
}

const About = () => {
  const { t, i18n } = useTranslation('home')
  const headingRef = useRef<HTMLHeadingElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (headingRef.current) {
      fadeInOnScroll(headingRef.current)
    }
    if (descriptionRef.current) {
      slideIn(descriptionRef.current, 'left')
    }
  }, [])

  return (
    <section id="about" className="bg-sand-50 py-22">
      <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
        <h2
          ref={headingRef}
          className="font-display text-36 lg:text-48 text-driftwood"
        >
          {t('about.title')}
        </h2>
        <p
          ref={descriptionRef}
          className="mt-6 text-16 text-driftwood lg:text-18 lg:leading-relaxed"
        >
          {resolveDescription(i18n.language)}
        </p>
      </div>
    </section>
  )
}

export default About
