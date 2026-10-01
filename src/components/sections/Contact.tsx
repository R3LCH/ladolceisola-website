import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import venue from '../../data/venue.json'
import { fadeInOnScroll, staggerGrid } from '../../utils/animations'

const Contact = () => {
  const { t } = useTranslation('home')
  const headingRef = useRef<HTMLHeadingElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (headingRef.current) {
      fadeInOnScroll(headingRef.current)
    }
    if (gridRef.current) {
      // staggerGrid exposes per-item delay as `amount`, not `stagger`
      staggerGrid(gridRef.current, { amount: 0.1 })
    }
  }, [])

  return (
    <section id="contact" className="bg-sand py-22 px-6 lg:px-8">
      <h2
        ref={headingRef}
        className="text-center font-display text-36 lg:text-48 text-driftwood mb-12"
      >
        {t('contact.title')}
      </h2>

      <div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
      >
        <div className="bg-white rounded-12 shadow-soft p-6 hover:shadow-lifted transition-shadow duration-300 text-center">
          <div className="text-48 mb-4" aria-hidden="true">
            📞
          </div>
          <p className="text-driftwood-light text-14 uppercase tracking-wider mb-2">
            {t('contact.phone')}
          </p>
          <a
            href={`tel:${venue.contact.phone}`}
            className="text-driftwood text-18 font-semibold hover:text-sunset transition-colors duration-300"
          >
            {venue.contact.phone}
          </a>
        </div>

        <div className="bg-white rounded-12 shadow-soft p-6 hover:shadow-lifted transition-shadow duration-300 text-center">
          <div className="text-48 mb-4" aria-hidden="true">
            📘
          </div>
          <p className="text-driftwood-light text-14 uppercase tracking-wider mb-2">
            {t('contact.followUs')}
          </p>
          <a
            href={venue.contact.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="text-driftwood text-18 font-semibold hover:text-sunset transition-colors duration-300"
          >
            Facebook
          </a>
        </div>

        <div className="bg-white rounded-12 shadow-soft p-6 hover:shadow-lifted transition-shadow duration-300 text-center">
          <div className="text-48 mb-4" aria-hidden="true">
            🕐
          </div>
          <p className="text-driftwood-light text-14 uppercase tracking-wider mb-2">
            {t('contact.openDaily')}
          </p>
          <p className="text-driftwood text-18 font-semibold">07:00 - 03:00</p>
        </div>
      </div>
    </section>
  )
}

export default Contact
