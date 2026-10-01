import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './i18n/config'
import './index.css'
import { MenuSection } from './components/menu'

// Simple smoke test app
function App() {
  return (
    <div className="min-h-screen bg-sand-50">
      <header className="bg-white shadow-soft py-8">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-48 text-driftwood text-center">
            La Dolce Isola Menu
          </h1>
        </div>
      </header>
      
      <MenuSection />
    </div>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
