import {
  useCallback,
  useLayoutEffect,
  useRef,
  type DependencyList,
  type RefObject,
} from 'react'
import { gsap, ScrollTrigger } from '../utils/animations.ts'

export interface UseGSAPOptions {
  /**
   * Element that scopes selector text (".card") and limits cleanup.
   * Pass a ref, or leave empty to scope to the whole document.
   */
  scope?: RefObject<Element | null>
  /** Re-run the animation when these change. Defaults to once on mount. */
  dependencies?: DependencyList
  /**
   * Revert the context when this media query stops matching, and rebuild
   * when it matches again. Example: "(min-width: 768px)".
   */
  media?: string
}

/** Stable handle returned by `useGSAP`. `context.current` is live across renders. */
export interface UseGSAPContext {
  context: RefObject<gsap.Context | null>
  contextSafe: <T extends (...args: never[]) => void>(fn: T) => T
}

/**
 * Run GSAP (and ScrollTrigger) setup inside a context that reverts on unmount
 * and whenever `dependencies` change. Safe under React StrictMode: the first
 * pass is reverted before the second one records animations.
 *
 * ScrollTrigger is registered by `src/utils/animations.ts`, which this hook
 * imports, so presets and the hook share one plugin registration.
 *
 * @example
 * const root = useRef<HTMLElement>(null)
 * useGSAP(() => {
 *   fadeInOnScroll('.intro', { duration: 1 })
 *   staggerGrid('.pastries', { childSelector: ':scope > article' })
 * }, { scope: root })
 *
 * @example
 * // Event handler that must record its tweens in the same context:
 * const root = useRef<HTMLDivElement>(null)
 * const { contextSafe } = useGSAP(() => {
 *   parallax('.hero-photo', { distance: 60 })
 * }, { scope: root })
 * const onOpen = contextSafe(() => {
 *   gsap.to('.panel', { autoAlpha: 1, y: 0, duration: 0.4 })
 * })
 */
export function useGSAP(
  animate: (context: gsap.Context) => void,
  options: UseGSAPOptions = {},
): UseGSAPContext {
  const { scope, dependencies = [], media } = options
  const contextRef = useRef<gsap.Context | null>(null)
  const animateRef = useRef(animate)
  animateRef.current = animate

  useLayoutEffect(() => {
    const scopeEl = scope?.current ?? undefined

    if (media) {
      const mediaQuery = gsap.matchMedia(scopeEl)
      mediaQuery.add(media, () => {
        contextRef.current = gsap.context((context) => {
          animateRef.current(context)
        }, scopeEl)
        return () => contextRef.current?.revert()
      })
      ScrollTrigger.refresh()
      return () => {
        mediaQuery.revert()
        contextRef.current = null
      }
    }

    contextRef.current = gsap.context((context) => {
      animateRef.current(context)
    }, scopeEl)
    ScrollTrigger.refresh()

    return () => {
      contextRef.current?.revert()
      contextRef.current = null
    }
    // `animate` is read through a ref so an inline callback is not a dependency.
    // `dependencies` is the caller's extra list; scope and media always re-run the effect.
  }, [scope, media, ...dependencies])

  const contextSafe = useCallback(
    <T extends (...args: never[]) => void>(fn: T): T => {
      return ((...args: never[]) => {
        const ctx = contextRef.current
        if (!ctx || ctx.isReverted) return
        ctx.add(() => {
          fn(...args)
        })
      }) as T
    },
    [],
  )

  return { context: contextRef, contextSafe }
}
