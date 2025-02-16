import { lazy, useMemo } from 'react'

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
	inputValue?: string | number | readonly string[]
	onInputChange: React.ChangeEventHandler<HTMLInputElement>
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
	onInputChange,
	onChangeValue,
	handlePopoverOpen
}: Props<T, O>) {
	const labelValue = useMemo(() => {
		if (value) {
			return options.find(data => String(data.id) === String(value))?.name
		}
		return
	}, [value, options])

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
					{options &&
						options.map((data, index) => (
							<li
								key={data.id}
								data-option-index={index}
								aria-disabled={false}
								aria-selected={false}
								value={value}
								onClick={() => {
									onChangeValue(name, data.id)
									handlePopoverOpen()
								}}
								role="option"
								className="w-full cursor-pointer pl-2 rounded py-1 hover:bg-slate-200"
							>
								{data.name}
							</li>
						))}
				</ul>
			</div>
		</>
	)
}
