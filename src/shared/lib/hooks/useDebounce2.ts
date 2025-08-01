import { useEffect, useRef, useCallback } from 'react'

export function useDebounce2<T extends (...args: any[]) => void>(func: T, delay = 500): T {
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

	const debouncedFunc = useCallback(
		(...args: Parameters<T>) => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current)
			}

			timeoutRef.current = setTimeout(() => {
				func(...args)
			}, delay)
		},
		[func, delay]
	)

	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current)
			}
		}
	}, [debouncedFunc])

	return debouncedFunc as T
}
