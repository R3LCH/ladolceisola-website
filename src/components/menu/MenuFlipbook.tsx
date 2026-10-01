import { useState, useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'
import { useSwipeGesture } from '../../hooks/useSwipeGesture'
import { useKeyboardNav } from '../../hooks/useKeyboardNav'

interface MenuFlipbookProps {
  onPageChange?: (page: number) => void
  initialPage?: number
  className?: string
}

const TOTAL_PAGES = 21
const IMAGE_BASE_PATH = '/images/menu/menu'

export function MenuFlipbook({
  onPageChange,
  initialPage = 1,
  className = '',
}: MenuFlipbookProps) {
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [isAnimating, setIsAnimating] = useState(false)
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({
    [initialPage]: true,
  })
  const [loadingImages, setLoadingImages] = useState<Record<number, boolean>>({})
  const leftPageRef = useRef<HTMLDivElement>(null)
  const rightPageRef = useRef<HTMLDivElement>(null)

  // Preload images for current page ±1
  useEffect(() => {
    const imagesToPreload = [
      currentPage - 1,
      currentPage,
      currentPage + 1,
      currentPage + 2, // For desktop spread
    ].filter((page) => page >= 1 && page <= TOTAL_PAGES && !loadedImages[page])

    if (imagesToPreload.length === 0) return

    setLoadingImages((prev) => {
      const next = { ...prev }
      imagesToPreload.forEach((page) => {
        next[page] = true
      })
      return next
    })

    imagesToPreload.forEach((page) => {
      const img = new Image()
      img.src = `${IMAGE_BASE_PATH}${page}.jpeg`
      img.onload = () => {
        setLoadedImages((prev) => ({ ...prev, [page]: true }))
        setLoadingImages((prev) => {
          const next = { ...prev }
          delete next[page]
          return next
        })
      }
      img.onerror = () => {
        // Still mark as "loaded" to avoid infinite retry
        setLoadedImages((prev) => ({ ...prev, [page]: true }))
        setLoadingImages((prev) => {
          const next = { ...prev }
          delete next[page]
          return next
        })
      }
    })
  }, [currentPage, loadedImages])

  const goToPage = useCallback(
    (newPage: number) => {
      if (
        newPage < 1 ||
        newPage > TOTAL_PAGES ||
        newPage === currentPage ||
        isAnimating
      ) {
        return
      }

      setIsAnimating(true)

      // Determine animation direction
      const isForward = newPage > currentPage

      // Animate page turn with 3D flip
      if (isForward) {
        // Flip right page
        gsap.to(rightPageRef.current, {
          rotateY: -180,
          duration: 0.8,
          ease: 'power2.out',
          transformOrigin: 'left center',
          onComplete: () => {
            setCurrentPage(newPage)
            setIsAnimating(false)
            // Reset transform
            gsap.set(rightPageRef.current, { rotateY: 0 })
            onPageChange?.(newPage)
          },
        })
      } else {
        // Flip left page backward
        gsap.to(leftPageRef.current, {
          rotateY: 180,
          duration: 0.8,
          ease: 'power2.out',
          transformOrigin: 'right center',
          onComplete: () => {
            setCurrentPage(newPage)
            setIsAnimating(false)
            // Reset transform
            gsap.set(leftPageRef.current, { rotateY: 0 })
            onPageChange?.(newPage)
          },
        })
      }
    },
    [currentPage, isAnimating, onPageChange],
  )

  const nextPage = useCallback(() => {
    // On desktop, jump by 2 pages (spread view)
    const isMobile = window.innerWidth < 768
    const increment = isMobile ? 1 : 2
    goToPage(currentPage + increment)
  }, [currentPage, goToPage])

  const prevPage = useCallback(() => {
    const isMobile = window.innerWidth < 768
    const decrement = isMobile ? 1 : 2
    goToPage(currentPage - decrement)
  }, [currentPage, goToPage])

  const goToFirstPage = useCallback(() => {
    goToPage(1)
  }, [goToPage])

  const goToLastPage = useCallback(() => {
    goToPage(TOTAL_PAGES)
  }, [goToPage])

  // Swipe gestures - hook returns ref
  const bookRef = useSwipeGesture<HTMLDivElement>({
    onSwipeLeft: nextPage,
    onSwipeRight: prevPage,
    threshold: 50,
  })

  // Keyboard navigation
  useKeyboardNav(
    {
      onArrowLeft: prevPage,
      onArrowRight: nextPage,
      onHome: goToFirstPage,
      onEnd: goToLastPage,
    },
    { enabled: true, preventDefault: true },
  )

  const isImageLoaded = (page: number): boolean => loadedImages[page] === true
  const isImageLoading = (page: number): boolean => loadingImages[page] === true

  const canGoPrev = currentPage > 1 && !isAnimating
  const canGoNext = currentPage < TOTAL_PAGES && !isAnimating

  const renderPage = (pageNum: number, ref?: React.RefObject<HTMLDivElement | null>) => {
    const isLoaded = isImageLoaded(pageNum)
    const isLoading = isImageLoading(pageNum)

    return (
      <div
        ref={ref}
        className="relative w-full h-full bg-white rounded-12 shadow-2xl overflow-hidden"
        style={{
          backfaceVisibility: 'hidden',
        }}
      >
        {!isLoaded && isLoading && (
          <div className="absolute inset-0 bg-sand-50 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-sunset-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        {!isLoaded && !isLoading && (
          <div className="absolute inset-0 bg-sand-50 animate-pulse" />
        )}
        <img
          src={`${IMAGE_BASE_PATH}${pageNum}.jpeg`}
          alt={`Menu page ${pageNum}`}
          className={`w-full h-full object-contain transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="eager"
        />
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      {/* Book container with perspective */}
      <div
        ref={bookRef}
        className="relative mx-auto"
        style={{
          perspective: '1200px',
          perspectiveOrigin: 'center center',
        }}
      >
        {/* Desktop: Two-page spread */}
        <div className="hidden md:flex gap-4 items-center justify-center">
          <div className="w-[45%] aspect-[3/4]">
            {currentPage > 1 ? renderPage(currentPage, leftPageRef) : <div />}
          </div>
          <div className="w-[45%] aspect-[3/4]">
            {currentPage + 1 <= TOTAL_PAGES ? renderPage(currentPage + 1, rightPageRef) : <div />}
          </div>
        </div>

        {/* Mobile: Single page */}
        <div className="md:hidden w-full max-w-md mx-auto aspect-[3/4]">
          {renderPage(currentPage, leftPageRef)}
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none px-4">
        <button
          onClick={prevPage}
          disabled={!canGoPrev}
          className={`
            pointer-events-auto
            w-12 h-12 rounded-full
            flex items-center justify-center
            transition-all duration-base ease-smooth
            ${
              canGoPrev
                ? 'bg-white/90 hover:bg-sunset-500 text-driftwood hover:text-white shadow-lifted hover:shadow-2xl'
                : 'bg-white/40 text-driftwood/40 cursor-not-allowed'
            }
          `}
          aria-label="Previous page"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={nextPage}
          disabled={!canGoNext}
          className={`
            pointer-events-auto
            w-12 h-12 rounded-full
            flex items-center justify-center
            transition-all duration-base ease-smooth
            ${
              canGoNext
                ? 'bg-white/90 hover:bg-sunset-500 text-driftwood hover:text-white shadow-lifted hover:shadow-2xl'
                : 'bg-white/40 text-driftwood/40 cursor-not-allowed'
            }
          `}
          aria-label="Next page"
        >
          <svg
            className="w-6 h-6"
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

      {/* Page indicator */}
      <div className="text-center mt-6">
        <span className="text-driftwood font-sans text-16">
          {currentPage} / {TOTAL_PAGES}
        </span>
      </div>
    </div>
  )
}
