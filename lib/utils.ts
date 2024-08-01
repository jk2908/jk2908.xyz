import { nanoid } from 'nanoid'

export const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
export const id = (l = 15) => nanoid(l)
