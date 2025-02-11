import { useEffect, useState } from 'react'

type OS = 'WINDOWS' | 'MAC' | 'LINUX' | 'ANDROID' | 'IOS' | 'UNKNOWN'

export function useOS() {
	const [os, setOS] = useState<OS>('UNKNOWN')

	useEffect(() => {
		const ua = window.navigator.userAgent.toLowerCase()

		switch (true) {
			case /android/.test(ua):
				setOS('ANDROID')
				break
			case /iphone|ipad|ipod/.test(ua):
				setOS('IOS')
				break
			case /macintosh|mac os x/.test(ua):
				setOS('MAC')
				break
			case /windows/.test(ua):
				setOS('WINDOWS')
				break
			case /linux/.test(ua):
				setOS('LINUX')
				break
			default:
				setOS('UNKNOWN')
		}
	}, [])

	return os
}
