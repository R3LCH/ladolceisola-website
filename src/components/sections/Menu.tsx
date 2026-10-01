import React from 'react'
import { useTranslation } from 'react-i18next'
import Section from '../layout/Section'

const Menu: React.FC = () => {
  const { t } = useTranslation()

  const categories = [
    'breakfast',
    'lunch',
    'dinner',
    'drinks',
    'cocktails',
    'wine',
    'gelato',
    'desserts',
  ]

  return (
    <Section id="menu" className="bg-sand">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-36 md:text-48 font-display font-bold text-driftwood mb-4">
            {t('menu.title')}
          </h2>
          <p className="text-18 md:text-20 text-sunset font-medium">
            {t('menu.subtitle')}
          </p>
        </div>

        {/* Categories Preview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {categories.map((category) => (
            <div
              key={category}
              className="bg-sand-light rounded-12 p-6 text-center hover:shadow-soft hover:bg-sand-50 transition-all duration-base cursor-pointer"
            >
              <p className="text-16 font-medium text-driftwood">
                {t(`menu.categories.${category}`)}
              </p>
            </div>
          ))}
        </div>

        {/* CTA to Full Menu */}
        <div className="text-center">
          <button className="inline-flex items-center gap-3 px-8 py-4 bg-sunset text-sand-50 text-16 font-medium rounded-12 shadow-glow-sunset hover:bg-sunset-dark hover:shadow-lifted transition-all duration-base">
            {t('menu.viewFull')}
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </Section>
  )
}

export default Menu
