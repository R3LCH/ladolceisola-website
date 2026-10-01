import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import venue from '../../data/venue.json'
import { fadeInOnScroll, slideIn } from '../../utils/animations'

const Location = () => {
  const { t } = useTranslation('home')
  const headingRef = useRef<HTMLHeadingElement>(null)
  const mapRef = useRef<HTMLIFrameElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  const { lat, lng } = venue.coordinates
  const mapSrc = `https://maps.google.com/maps?q=${lat},${lng}&hl=en&z=15&output=embed`
  const directionsHref = `https://www.google.com/maps/dir//${lat},${lng}`

  useEffect(() => {
    if (headingRef.current) {
      fadeInOnScroll(headingRef.current)
    }
    if (mapRef.current) {
      slideIn(mapRef.current, 'up')
    }
    if (cardRef.current) {
      fadeInOnScroll(cardRef.current, { delay: 0.2 })
    }
  }, [])

  return (
    <section id="location" className="bg-sand py-22 px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2
          ref={headingRef}
          className="text-center font-display text-36 lg:text-48 text-driftwood"
        >
          {t('location.title')}
        </h2>

        <iframe
          ref={mapRef}
          src={mapSrc}
          title={t('location.title')}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="mt-8 w-full h-96 lg:h-[500px] rounded-16 shadow-soft border-0"
        />

        <div
          ref={cardRef}
          className="bg-white rounded-12 shadow-soft p-6 max-w-md mx-auto mt-6"
        >
          <p className="text-center text-driftwood text-16">{venue.address.street}</p>
          <p className="text-center text-driftwood text-16">
            {venue.address.city}, {venue.address.region}
          </p>
          <p className="text-center text-driftwood text-16">{venue.address.country}</p>
          <a
            href={directionsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 block text-center text-sunset hover:text-sunset-dark"
          >
            {t('location.directions')}
          </a>
        </div>
      </div>
    </section>
  )
}

export default Location
