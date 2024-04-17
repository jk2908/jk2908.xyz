'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'

function GradientMask({
  isVisible,
  mirror,
}: {
  isVisible?: boolean
  mirror?: boolean
}) {
  return (
    <div
      className={cn(
        'to-app-bg/0 absolute z-10 w-6 from-app-bg opacity-0 transition-opacity duration-100',
        mirror
          ? 'inset-[0_0_0_auto] bg-gradient-to-l'
          : 'inset-[0_auto_0_0] bg-gradient-to-r',
        isVisible && 'opacity-100'
      )}
      aria-hidden="true"></div>
  )
}

export function Scrollable({
  children,
  auto,
  speed = 1500 / 60,
  wait,
}: {
  children: React.ReactNode
  auto?: boolean
  speed?: number
  wait?: number
}) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const resizeRef = useRef<ResizeObserver | null>()
  const vRef = useRef(0)
  const dRef = useRef(1)

  const [isLeftEdgeVisible, setLeftEdgeVisible] = useState(false)
  const [isRightEdgeVisible, setRightEdgeVisible] = useState(false)
  const [isPaused, setPaused] = useState<boolean>()

  const onScroll = useCallback(() => {
    const el = scrollRef.current

    if (!el) return

    const { scrollLeft, scrollWidth, clientWidth } = el

    setLeftEdgeVisible(scrollLeft > 0)
    setRightEdgeVisible(Math.ceil(scrollLeft) < scrollWidth - clientWidth)
  }, [])

  useEffect(() => {
    const el = scrollRef.current

    if (!el) return

    resizeRef.current = new ResizeObserver(onScroll)
    resizeRef.current.observe(el)

    onScroll()

    return () => {
      resizeRef.current?.unobserve(el)
      resizeRef.current = null
    }
  }, [onScroll])

  useEffect(() => {
    if (!auto) return

    const interval = setInterval(() => {
      const el = scrollRef.current
      const v = vRef.current
      const d = dRef.current

      if (!el || isPaused) return

      const { scrollWidth, clientWidth, scrollLeft } = el
      const isStart = scrollLeft === 0
      const isEnd = Math.ceil(scrollLeft + clientWidth) === scrollWidth

      if (scrollWidth <= clientWidth) return

      const move = () => {
        el.scrollLeft = v
        vRef.current = v + d
        dRef.current = scrollLeft === 0 ? 1 : isEnd ? -1 : d
      }

      if (wait && !isPaused && (isStart || isEnd)) {
        setPaused(true)

        setTimeout(() => {
          setPaused(false)
          move()
        }, wait)

        return
      }

      move()
    }, speed)

    return () => clearInterval(interval)
  }, [auto, wait, isPaused, speed])

  const play = () => setPaused(false)
  const pause = () => setPaused(true)

  return (
    <div ref={wrapperRef} className="hide-scrollbar relative overflow-auto">
      <GradientMask isVisible={isLeftEdgeVisible} />
      <div
        ref={scrollRef}
        onScroll={onScroll}
        onMouseEnter={pause}
        onMouseLeave={play}
        onPointerDown={pause}
        onPointerOut={play}
        className="hide-scrollbar flex overflow-auto whitespace-nowrap">
        {children}
      </div>
      <GradientMask isVisible={isRightEdgeVisible} mirror />
    </div>
  )
}
