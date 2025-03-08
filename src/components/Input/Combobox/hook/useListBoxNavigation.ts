import { useCallback, useEffect, useRef, useState } from 'react'

interface ListBoxNavigationProps<O> {
	options: O[]
	open: boolean
	onSelect: (option: O) => void
}

export function useListBoxNavigation<O>(props: ListBoxNavigationProps<O>) {
	const { open, onSelect, options } = props
	const [selectedIndex, setSelectedIndex] = useState<number>(-1) // Inicialmente, ninguna opción seleccionada
	const listRef = useRef<HTMLUListElement>(null) // Referencia a la lista <ul>

	const handlekeyDown = useCallback(
		(event: KeyboardEvent) => {
			if (!open) return

			switch (event.key) {
				case 'ArrowUp':
					event.preventDefault() // Evita el scroll de la página
					setSelectedIndex(prevIndex => (prevIndex <= -1 ? prevIndex : prevIndex - 1))
					break
				case 'ArrowDown':
					event.preventDefault() // Evita el scroll de la página
					setSelectedIndex(prevIndex =>
						prevIndex >= options.length - 1 ? prevIndex : prevIndex + 1
					)
					break
				case 'Enter':
					event.stopPropagation()
					event.preventDefault()
					if (selectedIndex !== -1) {
						onSelect(options[selectedIndex])
					}
					break
				case 'Escape':
					setSelectedIndex(-1)
					break
				default:
					break
			}
		},
		[open, selectedIndex, options, onSelect]
	)

	useEffect(() => {
		window.addEventListener('keydown', handlekeyDown)
		return () => {
			window.removeEventListener('keydown', handlekeyDown)
		}
	}, [handlekeyDown])

	useEffect(() => {
		if (selectedIndex !== -1 && listRef.current) {
			const selectedElement = listRef.current.children[selectedIndex] as HTMLElement
			if (selectedElement) {
				selectedElement.scrollIntoView({ block: 'nearest' })
			}
		}
	}, [selectedIndex])

	return { selectedIndex, setSelectedIndex, listRef }
}
