'use client'

import { useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'

function GradientMask({ visible, flipped }: { visible?: boolean; flipped?: boolean }) {
  return (
    <div
      className={cn(
        'to-app-bg/0 absolute z-10 w-6 from-app-bg opacity-0 transition-opacity duration-100',
        flipped ? 'inset-[0_0_0_auto] bg-gradient-to-l' : 'inset-[0_auto_0_0] bg-gradient-to-r',
        visible && 'opacity-100'
      )}
      aria-hidden="true"></div>
  )
}

export function Scrollable({ children }: { children: React.ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const resizeRef = useRef<ResizeObserver>()

  const [leftEdgeVisible, setLeftEdgeVisible] = useState(false)
  const [rightEdgeVisible, setRightEdgeVisible] = useState(false)

  function handleScroll() {
    const node = wrapperRef.current

    if (!node) return

    const { scrollLeft, scrollWidth, clientWidth } = node

    setLeftEdgeVisible(scrollLeft > 0)
    setRightEdgeVisible(Math.ceil(scrollLeft) < scrollWidth - clientWidth)
  }

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
  }, [])

  return (
    <div className="relative overflow-auto">
      <GradientMask visible={leftEdgeVisible} />
      <div
        ref={wrapperRef}
        onScroll={handleScroll}
        className="hide-scrollbar flex overflow-auto whitespace-nowrap">
        {children}
      </div>
      <GradientMask visible={rightEdgeVisible} flipped />
    </div>
  )
}
