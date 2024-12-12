'use client'

import { useCallback, useReducer, useEffect } from 'react'

type State = {
	isMoving: boolean
	startX: number
	startY: number
	translateX: number
	translateY: number
}

type Action = {
	type: 'START_MOVE' | 'MOVE' | 'END_MOVE'
	payload?: { clientX: number; clientY: number }
}

const initialState = {
	isMoving: false,
	startX: 0,
	startY: 0,
	translateX: 0,
	translateY: 0,
} satisfies State

function reducer(state: State, { payload, type }: Action) {
	const { isMoving, translateX, translateY, startX, startY } = state
	const { clientX, clientY } = payload ?? { clientX: 0, clientY: 0 }

	switch (type) {
		case 'START_MOVE':
			return {
				...state,
				isMoving: true,
				startX: clientX - translateX,
				startY: clientY - translateY,
			}
		case 'MOVE':
			if (!isMoving) return state

			return {
				...state,
				translateX: clientX - startX,
				translateY: clientY - startY,
			}
		case 'END_MOVE':
			return { ...state, isMoving: false }
		default:
			return state
	}
}

export function Move({
	children,
	style,
	...rest
}: { children: React.ReactNode } & React.ComponentPropsWithRef<'div'>) {
	const [{ isMoving, translateX, translateY }, dispatch] = useReducer(reducer, initialState)

	useEffect(() => {
		if (!isMoving) return

		function onMove(e: PointerEvent) {
			dispatch({ type: 'MOVE', payload: { clientX: e.clientX, clientY: e.clientY } })
		}

		function onRelease() {
			dispatch({ type: 'END_MOVE' })
		}

		let controller: AbortController | null = new AbortController()
		const { signal } = controller

		document.addEventListener('pointermove', onMove, { signal })
		document.addEventListener('pointerup', onRelease, { signal })
		document.addEventListener('pointercancel', onRelease, { signal })

		return () => {
			controller?.abort()
			controller = null
		}
	}, [isMoving])

	const onPress = useCallback((e: React.PointerEvent) => {
		e.currentTarget.setPointerCapture(e.pointerId)
		dispatch({ type: 'START_MOVE', payload: e })
	}, [])

	return (
		<div
			onPointerDown={onPress}
			style={{
				cursor: isMoving ? 'grabbing' : 'move',
				transform: `translate(${translateX}px, ${translateY}px)`,
				touchAction: 'none',
				userSelect: 'none',
				zIndex: isMoving ? 51 : 0,
				...style,
			}}
			{...rest}
		>
			{children}
		</div>
	)
}
