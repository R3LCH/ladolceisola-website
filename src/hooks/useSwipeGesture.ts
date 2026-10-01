import { useRef, useEffect, type RefObject } from 'react'

export interface SwipeGestureOptions {
  /** Callback triggered on swipe left gesture */
  onSwipeLeft?: () => void
  /** Callback triggered on swipe right gesture */
  onSwipeRight?: () => void
  /** Minimum distance in pixels to register as a swipe (default: 50) */
  threshold?: number
  /** Minimum velocity in px/ms to trigger immediate swipe (default: 0.5) */
  velocityThreshold?: number
}

interface TouchState {
  startX: number
  startY: number
  startTime: number
  currentX: number
  currentY: number
  isTracking: boolean
}

/**
 * Custom hook for detecting horizontal swipe gestures on touch devices.
 * Tracks touch events and triggers callbacks when horizontal swipes exceed
 * the minimum threshold or velocity. Vertical scrolling is preserved.
 *
 * @param options - Configuration object with swipe callbacks and thresholds
 * @returns RefObject to attach to the target element
 *
 * @example
 * const swipeRef = useSwipeGesture({
 *   onSwipeLeft: () => goToNextPage(),
 *   onSwipeRight: () => goToPreviousPage(),
 *   threshold: 50,
 *   velocityThreshold: 0.5
 * })
 * return <div ref={swipeRef}>Swipeable content</div>
 */
export function useSwipeGesture<T extends HTMLElement = HTMLElement>(
  options: SwipeGestureOptions = {},
): RefObject<T> {
  const {
    onSwipeLeft,
    onSwipeRight,
    threshold = 50,
    velocityThreshold = 0.5,
  } = options

  const elementRef = useRef<T>(null)
  const touchState = useRef<TouchState>({
    startX: 0,
    startY: 0,
    startTime: 0,
    currentX: 0,
    currentY: 0,
    isTracking: false,
  })

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0]
      if (!touch) return

      touchState.current = {
        startX: touch.clientX,
        startY: touch.clientY,
        startTime: Date.now(),
        currentX: touch.clientX,
        currentY: touch.clientY,
        isTracking: true,
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      const state = touchState.current
      if (!state.isTracking) return

      const touch = e.touches[0]
      if (!touch) return

      state.currentX = touch.clientX
      state.currentY = touch.clientY

      const deltaX = Math.abs(state.currentX - state.startX)
      const deltaY = Math.abs(state.currentY - state.startY)

      // Determine if this is a horizontal swipe gesture
      // If horizontal movement is greater than vertical, prevent default to stop scrolling
      if (deltaX > deltaY && deltaX > 10) {
        e.preventDefault()
      }
    }

    const handleTouchEnd = () => {
      const state = touchState.current
      if (!state.isTracking) return

      state.isTracking = false

      const deltaX = state.currentX - state.startX
      const deltaY = state.currentY - state.startY
      const absDeltaX = Math.abs(deltaX)
      const absDeltaY = Math.abs(deltaY)
      const duration = Date.now() - state.startTime
      const velocity = duration > 0 ? absDeltaX / duration : 0

      // Only process as horizontal swipe if horizontal movement dominates
      if (absDeltaX < absDeltaY) {
        return
      }

      // Check if swipe meets threshold or velocity requirements
      const meetsDistanceThreshold = absDeltaX >= threshold
      const meetsVelocityThreshold = velocity >= velocityThreshold

      if (meetsDistanceThreshold || meetsVelocityThreshold) {
        if (deltaX > 0 && onSwipeRight) {
          onSwipeRight()
        } else if (deltaX < 0 && onSwipeLeft) {
          onSwipeLeft()
        }
      }
    }

    // Add event listeners with passive: false to allow preventDefault
    element.addEventListener('touchstart', handleTouchStart, { passive: true })
    element.addEventListener('touchmove', handleTouchMove, { passive: false })
    element.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      element.removeEventListener('touchstart', handleTouchStart)
      element.removeEventListener('touchmove', handleTouchMove)
      element.removeEventListener('touchend', handleTouchEnd)
    }
  }, [onSwipeLeft, onSwipeRight, threshold, velocityThreshold])

  return elementRef as RefObject<T>
}
