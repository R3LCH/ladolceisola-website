import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import venue from '../../data/venue.json'
import { fadeInOnScroll, scaleOnScroll } from '../../utils/animations'

const Hours = () => {
  const { t } = useTranslation('home')
  const headingRef = useRef<HTMLHeadingElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (headingRef.current) {
      fadeInOnScroll(headingRef.current)
    }
    if (cardRef.current) {
      scaleOnScroll(cardRef.current, { scale: 0.95 })
    }
  }, [])

  return (
    <section id="hours" className="bg-sand-50 py-22 px-6">
      <h2
        ref={headingRef}
        className="text-center font-display text-36 lg:text-48 text-driftwood mb-12"
      >
        {t('hours.title')}
      </h2>

      <div
        ref={cardRef}
        className="bg-white rounded-16 shadow-soft p-8 max-w-md mx-auto text-center"
      >
        <p className="text-driftwood-light text-16 uppercase tracking-wider mb-4">
          {t('hours.daily')}
        </p>
        <p className="text-48 lg:text-60 font-display text-sunset font-semibold">
          {venue.hours.monday}
        </p>
        <p className="text-driftwood-light text-14 mt-2">
          {t('hours.morning')} & {t('hours.night')}
        </p>
      </div>
    </section>
  )
}

export default Hours
