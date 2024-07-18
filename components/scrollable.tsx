'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

function GradientMask({
  isVisible,
  toMirrored,
  ...rest
}: { isVisible?: boolean; toMirrored?: boolean } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      aria-hidden="true"
      {...rest}>
      <style>
        {`
          @scope {
            :scope {
              background: linear-gradient(${toMirrored ? 'to-left' : 'to-right'}, var(--app-bg) 0%, transparent 100%);
              opacity: ${isVisible ? 1 : 0};
              transition: opacity 100ms;
              z-index: 10;
            }
          }
        `}
      </style>
    </div>
  )
}

export function Scrollable({
  children,
  mode = 'manual',
  speed = 1500 / 60,
  wait,
  ...rest
}: {
  children: React.ReactNode
  mode?: 'auto' | 'manual'
  speed?: number
  wait?: number
} & React.HTMLAttributes<HTMLDivElement>) {
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
    if (mode !== 'auto') return

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
  }, [mode, wait, isPaused, speed])

  const play = () => setPaused(false)
  const pause = () => setPaused(true)

  return (
    <div
      ref={wrapperRef}
      {...rest}>
      <GradientMask isVisible={isLeftEdgeVisible} />

      <div
        ref={scrollRef}
        onScroll={onScroll}
        onMouseEnter={pause}
        onMouseLeave={play}>
        {children}
      </div>

      <GradientMask isVisible={isRightEdgeVisible} toMirrored />

      <style>
        {`
          @scope {
            :scope {
              overflow-x: auto;
              position: relative;
              scrollbar-width: none;
            }

            > div {
              display: flex;
              overflow-x: auto;
              scrollbar-width: none;
              white-space: nowrap;
            }
          }
        `}
      </style>
    </div>
  )
}
