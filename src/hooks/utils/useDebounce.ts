import { useEffect, useState } from 'react'

export function useDebounce<T>(value: T, delay = 500): [T, boolean] {
	const [debounceValue, setDebounceValue] = useState<T>(value)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		setLoading(true)
		const timeout = setTimeout(() => {
			setDebounceValue(value)
			setLoading(false)
		}, delay)

		return () => clearTimeout(timeout)
	}, [value, delay])

	return [debounceValue, loading]
}
