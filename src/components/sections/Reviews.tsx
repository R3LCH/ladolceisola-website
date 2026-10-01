import { useRef, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { gsap } from 'gsap'
import { useGSAP } from '../../hooks/useGSAP.ts'
import reviewsData from '../../data/reviews.json'

type Review = {
  id: number
  author: string
  rating: number
  text: string
  date: string
  lang: string
}

const STAR_PATH =
  'M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5Z'

const AUTO_PLAY_INTERVAL = 5000
const TRANSITION_DURATION = 0.6

function StarRow({ className }: { className: string }) {
  return (
    <span className={`flex gap-0.5 ${className}`} aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="size-4" fill="currentColor">
          <path d={STAR_PATH} />
        </svg>
      ))}
    </span>
  )
}

/** Five stars filled proportionally to `rating` (e.g. 4.6 → 92%). */
function Stars({ rating }: { rating: number }) {
  const percentage = (rating / 5) * 100
  return (
    <span className="relative inline-block">
      <StarRow className="text-sand-200" />
      <StarRow className="absolute inset-0 overflow-hidden text-sunset" style={{ width: `${percentage}%` }} />
    </span>
  )
}

function ChevronIcon({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={direction === 'left' ? 'rotate-90' : '-rotate-90'}
    >
      <path
        d="M3.5 6 8 10.5 12.5 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ReviewCard({ review }: { review: Review }) {
  const date = new Date(review.date).toLocaleDateString('it-IT', {
    year: 'numeric',
    month: 'long',
  })

  return (
    <article className="flex h-full flex-col rounded-12 border border-sand-200 bg-white p-6 shadow-soft">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-display text-18 text-driftwood">
            {review.author}
          </h3>
          <p className="mt-1 text-14 text-driftwood/60">{date}</p>
        </div>
        <Stars rating={review.rating} />
      </div>
      <p className="flex-1 text-16 leading-relaxed text-driftwood">
        {review.text}
      </p>
    </article>
  )
}

export function Reviews() {
  const { t } = useTranslation()
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const autoPlayTimerRef = useRef<number>()

  const reviews = reviewsData as Review[]
  const totalReviews = reviews.length

  // Calculate how many cards to show based on viewport
  const getCardsPerView = () => {
    if (typeof window === 'undefined') return 1
    if (window.innerWidth >= 1024) return 3
    if (window.innerWidth >= 640) return 2
    return 1
  }

  const [cardsPerView, setCardsPerView] = useState(getCardsPerView())

  useEffect(() => {
    const handleResize = () => {
      setCardsPerView(getCardsPerView())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const maxIndex = Math.max(0, totalReviews - cardsPerView)

  const goToNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }

  // Auto-play functionality
  useEffect(() => {
    if (isHovered) return

    autoPlayTimerRef.current = window.setInterval(() => {
      goToNext()
    }, AUTO_PLAY_INTERVAL)

    return () => {
      clearInterval(autoPlayTimerRef.current)
    }
  }, [isHovered, currentIndex, maxIndex])

  // GSAP animation for slide transitions
  useGSAP(
    () => {
      if (!containerRef.current) return

      const cards = containerRef.current.querySelectorAll('.review-card')
      const offset = -currentIndex * (100 / cardsPerView)

      gsap.to(cards, {
        x: `${offset}%`,
        duration: TRANSITION_DURATION,
        ease: 'power2.out',
      })
    },
    { dependencies: [currentIndex, cardsPerView], scope: containerRef }
  )

  const canGoPrev = currentIndex > 0
  const canGoNext = currentIndex < maxIndex

  return (
    <section className="relative bg-sand-light py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="font-display text-32 font-medium text-driftwood sm:text-48">
            {t('reviews.title', 'Cosa dicono di noi')}
          </h2>
          <p className="mt-4 text-18 text-driftwood/70">
            {t('reviews.subtitle', 'Le recensioni dei nostri clienti')}
          </p>
        </div>

        <div
          className="relative mt-12"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocus={() => setIsHovered(true)}
          onBlur={() => setIsHovered(false)}
        >
          {/* Carousel container */}
          <div className="overflow-hidden">
            <div ref={containerRef} className="flex gap-4 sm:gap-6">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="review-card w-full shrink-0"
                  style={{ flexBasis: `calc(${100 / cardsPerView}% - ${((cardsPerView - 1) * 24) / cardsPerView}px)` }}
                >
                  <ReviewCard review={review} />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation controls */}
          {totalReviews > cardsPerView && (
            <>
              <button
                onClick={goToPrev}
                disabled={!canGoPrev}
                aria-label={t('reviews.prev', 'Recensione precedente')}
                className="absolute left-0 top-1/2 z-10 flex size-10 -translate-x-4 -translate-y-1/2 items-center justify-center rounded-full border border-sand-200 bg-white text-driftwood shadow-soft transition-all duration-200 hover:border-ocean hover:text-ocean disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-sand-200 disabled:hover:text-driftwood sm:-translate-x-5"
              >
                <ChevronIcon direction="left" />
              </button>

              <button
                onClick={goToNext}
                disabled={!canGoNext}
                aria-label={t('reviews.next', 'Recensione successiva')}
                className="absolute right-0 top-1/2 z-10 flex size-10 -translate-y-1/2 translate-x-4 items-center justify-center rounded-full border border-sand-200 bg-white text-driftwood shadow-soft transition-all duration-200 hover:border-ocean hover:text-ocean disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-sand-200 disabled:hover:text-driftwood sm:translate-x-5"
              >
                <ChevronIcon direction="right" />
              </button>
            </>
          )}
        </div>

        {/* Pagination dots */}
        {totalReviews > cardsPerView && (
          <div className="mt-8 flex items-center justify-center gap-2">
            {Array.from({ length: maxIndex + 1 }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                aria-label={t('reviews.goToSlide', { number: i + 1 }, `Vai alla slide ${i + 1}`)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === currentIndex
                    ? 'w-8 bg-ocean'
                    : 'w-2 bg-sand-200 hover:bg-sand-200/70'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Reviews
