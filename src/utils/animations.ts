import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export type RevealDirection = 'left' | 'right' | 'up' | 'down'

export interface ScrollRevealOptions {
  start?: string
  end?: string
  scrub?: boolean
  markers?: boolean
  once?: boolean
  delay?: number
}

export interface StaggerOptions extends ScrollRevealOptions {
  amount?: number
  from?: 'start' | 'center' | 'end' | number
}

export interface ParallaxOptions {
  speed?: number
  start?: string
  end?: string
}

const EASE = 'power2.out'
const DURATION = 0.8

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function revealFrom(
  direction: RevealDirection,
  distance: number,
): gsap.TweenVars {
  const axis = direction === 'left' || direction === 'right' ? 'x' : 'y'
  const sign = direction === 'left' || direction === 'up' ? -1 : 1
  return {
    [axis]: sign * distance,
    opacity: 0,
  }
}

/**
 * Fade element in when it enters viewport
 */
export function fadeInOnScroll(
  target: gsap.TweenTarget,
  options: ScrollRevealOptions = {},
): gsap.core.Tween {
  const { start = 'top 80%', end, scrub = false, markers = false, once = true, delay = 0 } = options

  if (prefersReducedMotion()) {
    gsap.set(target, { opacity: 1 })
    return gsap.to(target, { duration: 0 })
  }

  return gsap.from(target, {
    opacity: 0,
    duration: DURATION,
    delay,
    ease: EASE,
    scrollTrigger: {
      trigger: target,
      start,
      end,
      scrub,
      markers,
      once,
    },
  })
}

/**
 * Slide element in from specified direction
 */
export function slideIn(
  target: gsap.TweenTarget,
  direction: RevealDirection = 'left',
  options: ScrollRevealOptions = {},
): gsap.core.Tween {
  const { start = 'top 80%', end, scrub = false, markers = false, once = true, delay = 0 } = options

  if (prefersReducedMotion()) {
    gsap.set(target, { opacity: 1, x: 0, y: 0 })
    return gsap.to(target, { duration: 0 })
  }

  return gsap.from(target, {
    ...revealFrom(direction, 60),
    duration: DURATION,
    delay,
    ease: EASE,
    scrollTrigger: {
      trigger: target,
      start,
      end,
      scrub,
      markers,
      once,
    },
  })
}

/**
 * Reveal grid items with stagger effect
 */
export function staggerGrid(
  container: gsap.DOMTarget,
  options: StaggerOptions = {},
): gsap.core.Tween {
  const {
    start = 'top 80%',
    end,
    scrub = false,
    markers = false,
    once = true,
    amount = 0.15,
    from = 'start',
  } = options

  if (prefersReducedMotion()) {
    gsap.set(container, { opacity: 1 })
    return gsap.to(container, { duration: 0 })
  }

  const children = gsap.utils.toArray((container as Element).children)

  return gsap.from(children, {
    opacity: 0,
    y: 30,
    duration: DURATION,
    ease: EASE,
    stagger: {
      amount,
      from,
    },
    scrollTrigger: {
      trigger: container,
      start,
      end,
      scrub,
      markers,
      once,
    },
  })
}

/**
 * Parallax effect for backgrounds and hero images
 */
export function parallax(
  target: gsap.TweenTarget,
  options: ParallaxOptions = {},
): gsap.core.Tween {
  const { speed = 0.5, start = 'top bottom', end = 'bottom top' } = options

  if (prefersReducedMotion()) {
    return gsap.to(target, { duration: 0 })
  }

  return gsap.to(target, {
    y: () => window.innerHeight * speed,
    ease: 'none',
    scrollTrigger: {
      trigger: target,
      start,
      end,
      scrub: true,
    },
  })
}

/**
 * Scale element on scroll
 */
export function scaleOnScroll(
  target: gsap.TweenTarget,
  options: ScrollRevealOptions & { scale?: number } = {},
): gsap.core.Tween {
  const { start = 'top 80%', scale = 0.8, once = true } = options

  if (prefersReducedMotion()) {
    gsap.set(target, { scale: 1 })
    return gsap.to(target, { duration: 0 })
  }

  return gsap.from(target, {
    scale,
    duration: DURATION,
    ease: EASE,
    scrollTrigger: {
      trigger: target,
      start,
      once,
    },
  })
}

export { gsap, ScrollTrigger }
