import { useEffect } from 'react'

interface Props<T> {
	open: boolean
	onClose: (arg?: T) => void
	ref: React.RefObject<HTMLElement | null>
}

export function useCLoseClickOrEscape<T>({ open, onClose, ref }: Props<T>) {
	useEffect(() => {
		if (!open) return
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				closeAndRemoveListener()
			}
		}

		const handleClickOutside = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				closeAndRemoveListener()
			}
		}

		function closeAndRemoveListener() {
			document.removeEventListener('keydown', handleKeyDown)
			document.removeEventListener('mousedown', handleClickOutside)
			onClose()
		}

		document.addEventListener('keydown', handleKeyDown)
		document.addEventListener('mousedown', handleClickOutside)

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
			document.removeEventListener('keydown', handleKeyDown)
		}
	}, [onClose, open])
}
