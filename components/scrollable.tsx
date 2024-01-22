'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

import { cn } from '@/lib/utils'

function GradientMask({ isVisible, mirror }: { isVisible?: boolean; mirror?: boolean }) {
  return (
    <div
      className={cn(
        'to-app-bg/0 absolute z-10 w-6 from-app-bg opacity-0 transition-opacity duration-100',
        mirror ? 'inset-[0_0_0_auto] bg-gradient-to-l' : 'inset-[0_auto_0_0] bg-gradient-to-r',
        isVisible && 'opacity-100'
      )}
      aria-hidden="true"></div>
  )
}

export function Scrollable({ children }: { children: React.ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const resizeRef = useRef<ResizeObserver>()

  const [isLeftEdgeVisible, setLeftEdgeVisible] = useState(false)
  const [isRightEdgeVisible, setRightEdgeVisible] = useState(false)

  const handleScroll = useCallback(() => {
    const node = wrapperRef.current

    if (!node) return

    const { scrollLeft, scrollWidth, clientWidth } = node

    setLeftEdgeVisible(scrollLeft > 0)
    setRightEdgeVisible(Math.ceil(scrollLeft) < scrollWidth - clientWidth)
  }, [])

  useEffect(() => {
    const node = wrapperRef.current

    if (!node) return

    resizeRef.current = new ResizeObserver(handleScroll)
    resizeRef.current.observe(node)

    handleScroll()

    return () => {
      if (node && resizeRef.current) {
        resizeRef.current.unobserve(node)
      }
    }
  }, [handleScroll])

  return (
    <div className="relative overflow-auto">
      <GradientMask isVisible={isLeftEdgeVisible} />
      <div
        ref={wrapperRef}
        onScroll={handleScroll}
        className="hide-scrollbar flex overflow-auto whitespace-nowrap">
        {children}
      </div>
      <GradientMask isVisible={isRightEdgeVisible} mirror />
    </div>
  )
}
