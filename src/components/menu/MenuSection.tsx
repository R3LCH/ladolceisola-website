import { useState, useEffect, useCallback } from 'react'
import { MenuFlipbook } from './MenuFlipbook'
import { CategorySidebar } from './CategorySidebar'
import { getFirstPageForCategory } from '../../data/menuData'

interface MenuSectionProps {
  className?: string
}

export function MenuSection({ className = '' }: MenuSectionProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [sidebarVisible, setSidebarVisible] = useState(false)
  const [inactivityTimer, setInactivityTimer] = useState<number | undefined>(undefined)

  // Auto-hide sidebar after 3 seconds of inactivity
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimer !== undefined) {
      clearTimeout(inactivityTimer)
    }
    
    setSidebarVisible(true)
    
    const timer = setTimeout(() => {
      setSidebarVisible(false)
    }, 3000)
    
    setInactivityTimer(timer)
  }, [inactivityTimer])

  // Show sidebar on mouse movement or touch
  useEffect(() => {
    const handleInteraction = () => {
      resetInactivityTimer()
    }

    window.addEventListener('mousemove', handleInteraction)
    window.addEventListener('touchstart', handleInteraction)
    
    // Show sidebar initially
    resetInactivityTimer()

    return () => {
      window.removeEventListener('mousemove', handleInteraction)
      window.removeEventListener('touchstart', handleInteraction)
      if (inactivityTimer !== undefined) {
        clearTimeout(inactivityTimer)
      }
    }
  }, [resetInactivityTimer, inactivityTimer])

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page)
    resetInactivityTimer()
  }, [resetInactivityTimer])

  const handleCategoryClick = useCallback((categoryId: string) => {
    const firstPage = getFirstPageForCategory(categoryId)
    if (firstPage) {
      setCurrentPage(firstPage)
      resetInactivityTimer()
    }
  }, [resetInactivityTimer])

  return (
    <section className={`relative min-h-screen bg-sand-50 py-16 ${className}`}>
      <CategorySidebar
        isVisible={sidebarVisible}
        onCategoryClick={handleCategoryClick}
        currentPage={currentPage}
      />
      
      <div className="container mx-auto px-4">
        <MenuFlipbook
          onPageChange={handlePageChange}
          initialPage={1}
        />
      </div>
    </section>
  )
}
