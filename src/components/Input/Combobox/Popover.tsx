import { lazy, useCallback, useMemo } from 'react'
import parse from 'autosuggest-highlight/parse'
import match from 'autosuggest-highlight/match'

const SearchBar = lazy(async () => import('./SearchBar').then(m => ({ default: m.SearchBar })))
const Typography = lazy(async () => import('@/components/Typography'))
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
	onInputChange,
	onChangeValue,
	handlePopoverOpen
}: Props<T, O>) {
	const labelValue = useMemo(() => {
		return options.find(data => String(data.id) === String(value))?.name
	}, [value, options])

	const hanldeOptionClick = useCallback(
		(option: ValidType) => {
			onChangeValue(name, option.id)
			handlePopoverOpen()
		},
		[onChangeValue, handlePopoverOpen, name]
	)

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
						onClick={() => hanldeOptionClick(option)}
						role="option"
						className="w-full cursor-pointer pl-2 rounded py-1 hover:bg-slate-200"
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
	}, [loading, options, inputValue])

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
				<SearchBar id={id} value={inputValue} onInputChange={onInputChange} open={open} />
				<ul
					role="listbox"
					className="flex flex-col  text-black/85 text-xs"
					id={`combo-box-${name}-listbox`}
					aria-labelledby={`combo-box-${name}-label`}
				>
					{popoverContent}
				</ul>
			</div>
		</>
	)
}
