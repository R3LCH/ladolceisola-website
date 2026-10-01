import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { supportedLanguages, type AppLanguage } from '../../i18n/config'

const Header: React.FC = () => {
  const { t, i18n } = useTranslation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setIsMobileMenuOpen(false)
    }
  }

  const changeLanguage = (lng: AppLanguage) => {
    void i18n.changeLanguage(lng)
    setIsLanguageMenuOpen(false)
  }

  const languageNames: Record<AppLanguage, string> = {
    it: 'IT',
    en: 'EN',
    ru: 'RU',
    uk: 'UA',
    pl: 'PL',
    de: 'DE',
  }

  const navItems = [
    { key: 'home', href: 'hero' },
    { key: 'about', href: 'about' },
    { key: 'menu', href: 'menu' },
    { key: 'gallery', href: 'gallery' },
    { key: 'reviews', href: 'reviews' },
    { key: 'contact', href: 'contact' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-base ${
        isScrolled
          ? 'bg-sand/95 backdrop-blur-sm shadow-soft'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('hero')}
            className="text-2xl font-display font-semibold text-driftwood hover:text-sunset transition-colors duration-fast"
          >
            La Dolce Isola
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => scrollToSection(item.href)}
                className="text-16 text-driftwood hover:text-sunset transition-colors duration-fast"
              >
                {t(`nav.${item.key}`)}
              </button>
            ))}

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 text-14 font-medium text-driftwood hover:text-sunset transition-colors duration-fast"
                aria-label="Change language"
              >
                <span>{languageNames[i18n.language as AppLanguage]}</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-fast ${
                    isLanguageMenuOpen ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isLanguageMenuOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-sand-50 rounded-8 shadow-lifted overflow-hidden">
                  {supportedLanguages.map((lng) => (
                    <button
                      key={lng}
                      onClick={() => changeLanguage(lng)}
                      className={`block w-full px-4 py-2 text-left text-14 transition-colors duration-fast ${
                        i18n.language === lng
                          ? 'bg-sunset text-sand-50 font-medium'
                          : 'text-driftwood hover:bg-sand-100'
                      }`}
                    >
                      {languageNames[lng]}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-driftwood hover:text-sunset transition-colors duration-fast"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-driftwood/10">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => scrollToSection(item.href)}
                className="block w-full text-left px-4 py-3 text-16 text-driftwood hover:text-sunset hover:bg-sand-100 transition-colors duration-fast"
              >
                {t(`nav.${item.key}`)}
              </button>
            ))}

            {/* Mobile Language Switcher */}
            <div className="px-4 py-3 border-t border-driftwood/10 mt-2">
              <div className="text-14 font-medium text-driftwood mb-2">
                Language
              </div>
              <div className="grid grid-cols-3 gap-2">
                {supportedLanguages.map((lng) => (
                  <button
                    key={lng}
                    onClick={() => changeLanguage(lng)}
                    className={`px-3 py-2 text-14 rounded-8 transition-colors duration-fast ${
                      i18n.language === lng
                        ? 'bg-sunset text-sand-50 font-medium'
                        : 'bg-sand-100 text-driftwood hover:bg-sand-200'
                    }`}
                  >
                    {languageNames[lng]}
                  </button>
                ))}
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header
