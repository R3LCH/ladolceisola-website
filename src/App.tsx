import React from 'react'
import { useTranslation } from 'react-i18next'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Menu from './components/sections/Menu'
import Gallery from './components/sections/Gallery'
import Location from './components/sections/Location'
import Hours from './components/sections/Hours'
import Contact from './components/sections/Contact'

const App: React.FC = () => {
  const { i18n } = useTranslation()

  // Sync document lang attribute
  React.useEffect(() => {
    document.documentElement.lang = i18n.language.slice(0, 2)
  }, [i18n.language])

  return (
    <div className="min-h-screen bg-sand-50">
      <Header />
      <main>
        <Hero />
        <About />
        <Menu />
        <Gallery />
        <Location />
        <Hours />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
