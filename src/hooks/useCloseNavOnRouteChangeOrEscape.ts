import { useEffect } from 'react'

export function useCloseNavOnRouteChangeOrEscpae(
	ref: React.RefObject<HTMLInputElement | null>
) {
	const location = window.location.pathname

	useEffect(() => {
		function closeNavToggle() {
			if (ref?.current) {
				ref.current.checked = false
			}
		}

		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				closeNavToggle()
				return
			}
		}

		closeNavToggle()

		document.addEventListener('keydown', handleEscape)

		return () => {
			document.removeEventListener('keydown', handleEscape)
		}
	}, [location, ref])
}
