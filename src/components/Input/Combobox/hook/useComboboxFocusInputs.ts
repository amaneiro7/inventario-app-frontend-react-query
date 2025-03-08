import { useCallback, useState } from 'react'

export function useComboboxFocusInputs({ ref }: { ref: React.RefObject<HTMLDivElement | null> }) {
	const [open, setOpen] = useState(false)

	const handlePopoverClose = useCallback(() => setOpen(false), [])
	const handlePopoverOpen = useCallback(() => setOpen(true), [])

	const handleInputFocus = useCallback((event: React.FocusEvent) => {
		if (
			event.target instanceof HTMLButtonElement &&
			event.target.dataset.comboboxToggle === 'true'
		) {
			return
		}
		if (
			event.target instanceof HTMLInputElement &&
			event.target.dataset.comboboxInputButton === 'true'
		) {
			return
		}
		event.stopPropagation()
		setOpen(true)
	}, [])

	const handleInputBlur = useCallback(
		(event: React.FocusEvent) => {
			event.stopPropagation()
			if (!(ref.current && ref.current.contains(event.relatedTarget as Node))) {
				handlePopoverClose()
			}
		},
		[handlePopoverClose]
	)
	return {
		open,
		handlePopoverClose,
		handlePopoverOpen,
		handleInputFocus,
		handleInputBlur
	}
}
