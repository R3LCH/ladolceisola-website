import React, { useEffect, useRef } from 'react'
import { fadeInOnScroll } from '../../utils/animations'

interface SectionProps {
  id: string
  className?: string
  children: React.ReactNode
}

const Section: React.FC<SectionProps> = ({ id, className = '', children }) => {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (sectionRef.current) {
      fadeInOnScroll(sectionRef.current)
    }
  }, [])

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`py-16 md:py-24 ${className}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  )
}

export default Section
