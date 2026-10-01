import { useEffect } from 'react'

export interface KeyboardNavHandlers {
  onArrowLeft?: () => void
  onArrowRight?: () => void
  onArrowUp?: () => void
  onArrowDown?: () => void
  onHome?: () => void
  onEnd?: () => void
  onPageUp?: () => void
  onPageDown?: () => void
}

interface KeyboardNavOptions {
  enabled?: boolean
  preventDefault?: boolean
}

/**
 * Hook to handle keyboard navigation
 * @param handlers - Object with keyboard event handlers
 * @param options - Configuration options
 */
export function useKeyboardNav(
  handlers: KeyboardNavHandlers,
  options: KeyboardNavOptions = {},
): void {
  const { enabled = true, preventDefault = true } = options

  useEffect(() => {
    if (!enabled) return

    const handleKeyDown = (e: KeyboardEvent): void => {
      let handled = false

      switch (e.key) {
        case 'ArrowLeft':
          handlers.onArrowLeft?.()
          handled = true
          break
        case 'ArrowRight':
          handlers.onArrowRight?.()
          handled = true
          break
        case 'ArrowUp':
          handlers.onArrowUp?.()
          handled = true
          break
        case 'ArrowDown':
          handlers.onArrowDown?.()
          handled = true
          break
        case 'Home':
          handlers.onHome?.()
          handled = true
          break
        case 'End':
          handlers.onEnd?.()
          handled = true
          break
        case 'PageUp':
          handlers.onPageUp?.()
          handled = true
          break
        case 'PageDown':
          handlers.onPageDown?.()
          handled = true
          break
      }

      if (handled && preventDefault) {
        e.preventDefault()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handlers, enabled, preventDefault])
}
