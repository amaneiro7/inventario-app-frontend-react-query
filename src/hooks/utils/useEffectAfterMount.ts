import { useEffect, useRef } from 'react'

export function useEffectAfterMount(fn: () => void, deps: unknown[] = []) {
	const isMounted = useRef(false)

	useEffect(() => {
		if (!isMounted.current) {
			isMounted.current = true
			return
		}
		fn()
	}, deps)
}
