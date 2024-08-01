import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export function debounce<T extends Array<unknown>>(fn: (...args: T) => void, wait: number) {
  let timeoutId: ReturnType<typeof setTimeout> | number | undefined = undefined

  return (...args: T) => {
    clearTimeout(timeoutId)

    timeoutId = setTimeout(() => {
      fn.apply(null, args)
    }, wait)
  }
}