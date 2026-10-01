import React from 'react'
import { useTranslation } from 'react-i18next'
import Section from '../layout/Section'

const Gallery: React.FC = () => {
  const { t } = useTranslation()

  return (
    <Section id="gallery" className="bg-sand-50">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-36 md:text-48 font-display font-bold text-driftwood mb-4">
            {t('gallery.title')}
          </h2>
          <p className="text-18 md:text-20 text-sunset font-medium">
            {t('gallery.subtitle')}
          </p>
        </div>

        {/* Gallery Placeholder */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="aspect-square bg-sand rounded-12 hover:shadow-lifted hover:-translate-y-1 transition-all duration-base cursor-pointer overflow-hidden"
            >
              <div className="w-full h-full flex items-center justify-center text-driftwood-light">
                <svg
                  className="w-16 h-16"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

export default Gallery
