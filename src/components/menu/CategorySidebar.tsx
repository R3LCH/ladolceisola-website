import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { gsap } from 'gsap'
import { getNavigableCategories, getCategoryForPage } from '../../data/menuData'
import type { MenuCategory } from '../../data/menuData'

interface CategorySidebarProps {
  isVisible: boolean
  onCategoryClick: (categoryId: string) => void
  currentPage: number
  className?: string
}

export function CategorySidebar({
  isVisible,
  onCategoryClick,
  currentPage,
  className = '',
}: CategorySidebarProps) {
  const { i18n } = useTranslation()
  const sidebarRef = useRef<HTMLDivElement>(null)
  const categories = getNavigableCategories()
  const activeCategory = getCategoryForPage(currentPage)

  useEffect(() => {
    if (!sidebarRef.current) return

    gsap.to(sidebarRef.current, {
      x: isVisible ? 0 : '-100%',
      duration: 0.3,
      ease: 'power2.out',
    })
  }, [isVisible])

  const handleCategoryClick = (category: MenuCategory) => {
    onCategoryClick(category.id)
  }

  const getCategoryName = (category: MenuCategory): string => {
    const currentLanguage = i18n.language || 'it'
    return category.nameTranslations[currentLanguage as keyof typeof category.nameTranslations] || category.name
  }

  return (
    <aside
      ref={sidebarRef}
      className={`fixed left-0 top-0 h-screen w-60 md:w-[280px] bg-sand-50 shadow-lifted rounded-r-12 z-40 ${className}`}
      style={{ transform: 'translateX(-100%)' }}
    >
      <nav className="h-full overflow-y-auto py-8 px-4">
        <ul className="space-y-2">
          {categories.map((category) => {
            const isActive = activeCategory?.id === category.id

            return (
              <li key={category.id}>
                <button
                  onClick={() => handleCategoryClick(category)}
                  className={`
                    w-full text-left px-4 py-3 rounded-8 
                    transition-all duration-base ease-smooth
                    font-sans text-16
                    ${
                      isActive
                        ? 'bg-sunset-500 text-white shadow-soft'
                        : 'bg-transparent text-driftwood hover:bg-sunset-400/10'
                    }
                  `}
                >
                  {getCategoryName(category)}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}
