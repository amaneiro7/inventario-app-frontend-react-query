import { lazy, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import parse from 'autosuggest-highlight/parse'
import match from 'autosuggest-highlight/match'
import Typography from '@/components/Typography'

const SearchBar = lazy(async () => import('./SearchBar').then(m => ({ default: m.SearchBar })))

interface ValidType {
	id: string | number
	name: string
}

interface Props<T extends string | number | readonly string[], O extends ValidType>
	extends React.DetailedHTMLProps<
		React.ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {
	options: O[]
	value: T
	name: string
	loading: boolean
	inputValue?: string
	onInputChange: (value: string) => void
	open: boolean
	searchField?: boolean
	handlePopoverOpen: () => void
	onChangeValue: (name: ValidType['name'], value: ValidType['id']) => void
}

export function Popover<O extends ValidType, T extends string | number | readonly string[]>({
	id,
	options,
	value,
	name,
	inputValue,
	open,
	loading,
	searchField = true,
	onInputChange,
	onChangeValue,
	handlePopoverOpen
}: Props<T, O>) {
	const [selectedIndex, setSelectedIndex] = useState<number>(-1) // Inicialmente, ninguna opción seleccionada
	const listRef = useRef<HTMLUListElement>(null) // Referencia a la lista <ul>
	const labelValue = useMemo(() => {
		return options.find(data => String(data.id) === String(value))?.name
	}, [value, options])

	const handleOptionClick = useCallback(
		(option: ValidType) => {
			onChangeValue(name, option.id)
			handlePopoverOpen()
		},
		[onChangeValue, handlePopoverOpen, name]
	)

	useEffect(() => {
		const handlekeyDown = (event: KeyboardEvent) => {
			if (!open) return

			switch (event.key) {
				case 'ArrowUp':
					event.preventDefault() // Evita el scroll de la página
					setSelectedIndex(prevIndex => Math.min(prevIndex - 1, 0))
					break
				case 'ArrowDown':
					event.preventDefault() // Evita el scroll de la página
					setSelectedIndex(prevIndex => Math.min(prevIndex + 1, options.length - 1))
					break
				case 'Enter':
					event.stopPropagation()
					event.preventDefault()
					if (selectedIndex !== -1) {
						handleOptionClick(options[selectedIndex])
					}
					break
				case 'Escape':
					handlePopoverOpen()
					break
				default:
					break
			}
		}
		window.addEventListener('keydown', handlekeyDown)

		return () => {
			window.removeEventListener('keydown', handlekeyDown)
		}
	}, [open, selectedIndex, options, handleOptionClick, handlePopoverOpen])

	useEffect(() => {
		if (selectedIndex !== -1 && listRef.current) {
			const selectedElement = listRef.current.children[selectedIndex] as HTMLElement
			if (selectedElement) {
				selectedElement.scrollIntoView({ block: 'nearest' })
			}
		}
	}, [selectedIndex])

	const popoverContent = useMemo(() => {
		return loading ? (
			<li className="w-full pl-2 rounded py-1">
				<Typography variant="span" option="tiny">
					Cargando...
				</Typography>
			</li>
		) : options.length === 0 ? (
			<li className="w-full pl-2 rounded py-1">
				<Typography variant="p" option="tiny">
					No existe
				</Typography>
			</li>
		) : (
			options.map((option, index) => {
				const matches = match(option.name, inputValue ?? '', { insideWords: true })
				const parts = parse(option.name, matches)
				return (
					<li
						key={option.id}
						data-option-index={index}
						aria-disabled={false}
						aria-selected={false}
						value={value}
						onClick={() => handleOptionClick(option)}
						role="option"
						className={`w-full cursor-pointer pl-2 rounded py-1 hover:bg-slate-200 ${
							selectedIndex === index ? 'bg-slate-300' : ''
						}`}
					>
						<Typography variant="p">
							{parts.map((part, index) => (
								<Typography
									key={index}
									variant="span"
									option="tiny"
									weight={part.highlight ? 'extrabold' : 'light'}
								>
									{part.text}
								</Typography>
							))}
						</Typography>
					</li>
				)
			})
		)
	}, [loading, options, inputValue, selectedIndex])

	return (
		<>
			<button type="button" className="button-popover" onClick={handlePopoverOpen}>
				<p className="text-left " aria-hidden>
					{labelValue}
				</p>
			</button>
			<div
				id={`combobox-${id}`}
				key={id}
				role="combobox"
				className={`div-popover ${open ? 'open' : 'close'}`}
			>
				{searchField ? (
					<SearchBar
						id={id}
						value={inputValue}
						onInputChange={onInputChange}
						open={open}
					/>
				) : null}
				<ul
					role="listbox"
					className="flex flex-col  text-black/85 text-xs"
					id={`combo-box-${name}-listbox`}
					aria-labelledby={`combo-box-${name}-label`}
					ref={listRef}
				>
					{popoverContent}
				</ul>
			</div>
		</>
	)
}
