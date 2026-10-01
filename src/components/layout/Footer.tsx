import React from 'react'
import { useTranslation } from 'react-i18next'
import venueData from '../../data/venue.json'

const Footer: React.FC = () => {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <footer className="bg-driftwood text-sand-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <h3 className="text-24 font-display font-semibold mb-4">
              La Dolce Isola
            </h3>
            <p className="text-14 text-sand-100 mb-4">
              {t('footer.tagline')}
            </p>
            <div className="flex gap-4">
              {venueData.contact.facebook && (
                <a
                  href={venueData.contact.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center bg-sand-50/10 hover:bg-sunset rounded-8 transition-colors duration-fast"
                  aria-label="Facebook"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-18 font-display font-semibold mb-4">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-2">
              {['home', 'about', 'menu', 'gallery', 'reviews', 'contact'].map(
                (item) => (
                  <li key={item}>
                    <button
                      onClick={() => scrollToSection(item === 'home' ? 'hero' : item)}
                      className="text-14 text-sand-100 hover:text-sunset transition-colors duration-fast"
                    >
                      {t(`nav.${item}`)}
                    </button>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="text-18 font-display font-semibold mb-4">
              {t('footer.openingHours')}
            </h4>
            <div className="text-14 text-sand-100 space-y-2">
              <p className="font-medium">{t('footer.allDays')}</p>
              <p>{venueData.hours.monday}</p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-18 font-display font-semibold mb-4">
              {t('contact.title')}
            </h4>
            <address className="text-14 text-sand-100 space-y-2 not-italic">
              <p>{venueData.address.street}</p>
              <p>
                {venueData.address.city}, {venueData.address.province}
              </p>
              <p className="pt-2">
                <a
                  href={`tel:${venueData.contact.phone}`}
                  className="hover:text-sunset transition-colors duration-fast"
                >
                  {venueData.contact.phone}
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-sand-50/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-14 text-sand-100">
              {t('footer.rights', { year: currentYear })}
            </p>
            <div className="flex gap-6">
              <button className="text-14 text-sand-100 hover:text-sunset transition-colors duration-fast">
                {t('footer.privacy')}
              </button>
              <button className="text-14 text-sand-100 hover:text-sunset transition-colors duration-fast">
                {t('footer.terms')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
