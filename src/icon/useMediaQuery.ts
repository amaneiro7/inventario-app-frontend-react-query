import { useState, useEffect } from 'react'

export function useMediaQuery(query: string): boolean {
	const [matches, setMatches] = useState(false)

	useEffect(() => {
		const mediaQueryList = window.matchMedia(query)

		const handleChange = () => setMatches(mediaQueryList.matches)

		handleChange() // Initial check
		mediaQueryList.addEventListener('change', handleChange)

		return () => {
			mediaQueryList.removeEventListener('change', handleChange)
		}
	}, [query])

	return matches
}
