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

export default function Scrollable({ children }: { children: React.ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const resizeRef = useRef<ResizeObserver>()

  const [isLeftEdgeVisible, setIsLeftEdgeVisible] = useState(false)
  const [isRightEdgeVisible, setIsRightEdgeVisible] = useState(false)

  function handleScroll(target: HTMLElement | null) {
    if (!target) {
      return
    }

    const { scrollLeft, scrollWidth, clientWidth } = target

    setIsLeftEdgeVisible(scrollLeft > 0)
    setIsRightEdgeVisible(Math.ceil(scrollLeft) < scrollWidth - clientWidth)
  }

  useEffect(() => {
    const wrapper = wrapperRef.current

    if (!wrapper) {
      return
    }

    resizeRef.current = new ResizeObserver(() => handleScroll(wrapper))
    resizeRef.current.observe(wrapper)

    handleScroll(wrapper)

    return () => {
      if (wrapper && resizeRef.current) {
        resizeRef.current.unobserve(wrapper)
      }
    }
  }, [])

  return (
    <div className="relative overflow-auto">
      <GradientMask visible={isLeftEdgeVisible} />
      <div
        ref={wrapperRef}
        onScroll={e => handleScroll(e.currentTarget)}
        className="hide-scrollbar flex overflow-auto whitespace-nowrap">
        {children}
      </div>
      <GradientMask visible={isRightEdgeVisible} flipped />
    </div>
  )
}
