import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

export const supportedLanguages = ['it', 'en', 'ru', 'uk', 'pl', 'de'] as const

export type AppLanguage = (typeof supportedLanguages)[number]

export const defaultLanguage: AppLanguage = 'it'

await i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {}, // Will be populated by lazy loading
    fallbackLng: defaultLanguage,
    supportedLngs: [...supportedLanguages],
    nonExplicitSupportedLngs: true,
    load: 'languageOnly',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },
    react: {
      useSuspense: false,
    },
  })

// Lazy load translations
async function loadTranslation(lng: string) {
  try {
    const [translation, home] = await Promise.all([
      import(`../../public/locales/${lng}/translation.json`),
      import(`../../public/locales/${lng}/home.json`),
    ])
    i18n.addResourceBundle(lng, 'translation', translation.default, true, true)
    i18n.addResourceBundle(lng, 'home', home.default, true, true)
  } catch (error) {
    console.warn(`Failed to load translation for ${lng}:`, error)
  }
}

// Load initial language and wait for it
await loadTranslation(i18n.resolvedLanguage ?? defaultLanguage)

// Keep <html lang>, <title> and meta description in sync
function syncDocument(lng: string) {
  document.documentElement.lang = lng.slice(0, 2)
  if (i18n.hasResourceBundle(lng, 'translation')) {
    document.title = i18n.t('meta.title')
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', i18n.t('meta.description'))
  }
}

i18n.on('languageChanged', (lng) => {
  void loadTranslation(lng).then(() => syncDocument(lng))
})

if (i18n.isInitialized) syncDocument(i18n.resolvedLanguage ?? defaultLanguage)

export default i18n
