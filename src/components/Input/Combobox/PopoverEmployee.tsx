import { lazy, useMemo } from 'react'
import parse from 'autosuggest-highlight/parse'
import match from 'autosuggest-highlight/match'
import { type EmployeeDto } from '@/core/employee/employee/domain/dto/Employee.dto'

const SearchBar = lazy(async () => import('./SearchBar').then(m => ({ default: m.SearchBar })))
const Typography = lazy(async () => import('@/components/Typography'))

interface Props<T extends string | number | readonly string[]>
	extends React.DetailedHTMLProps<
		React.ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {
	options: EmployeeDto[]
	value: T
	name: string
	loading: boolean
	inputValue?: string
	onInputChange: React.ChangeEventHandler<HTMLInputElement>
	open: boolean
	handlePopoverOpen: () => void
	onChangeValue: (name: EmployeeDto['userName'], value: EmployeeDto['id']) => void
}

export function PopoverEmployee<T extends string | number | readonly string[]>({
	id,
	options,
	value,
	name,
	loading,
	inputValue,
	open,
	onInputChange,
	onChangeValue,
	handlePopoverOpen
}: Props<T>) {
	const labelValue = useMemo(() => {
		if (value) {
			return options.find(data => String(data.id) === String(value))?.userName
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
					{loading && (
						<li className="w-full pl-2 rounded py-1">
							<Typography variant="span" option="tiny">
								Cargando...
							</Typography>
						</li>
					)}
					{!loading && options.length === 0 && (
						<li className="w-full pl-2 rounded py-1">
							<Typography variant="p" option="tiny">
								No existe
							</Typography>
						</li>
					)}
					{!loading &&
						options.length > 0 &&
						options.map((option, index) => {
							const matches = match(option.userName, inputValue ?? '', {
								insideWords: true
							})
							const parts = parse(option.userName, matches)
							const fullName = `${option?.name ? option?.name : ''} ${
								option?.lastName ? option?.lastName : ''
							}`
							const fullNameMatch = match(fullName, inputValue ?? '', {
								insideWords: true
							})
							const fullNameParts = parse(fullName, fullNameMatch)
							return (
								<li
									key={option.id}
									data-option-index={index}
									aria-disabled={false}
									aria-selected={false}
									value={inputValue}
									onClick={() => {
										onChangeValue(name, option.id)
										handlePopoverOpen()
									}}
									role="option"
									className="w-full cursor-pointer pl-2 rounded py-1 hover:bg-slate-200"
								>
									<div>
										<Typography variant="p">
											{parts.map((part, index) => (
												<Typography
													key={index}
													variant="span"
													option="tiny"
													transform="uppercase"
													weight={part.highlight ? 'bold' : 'light'}
												>
													{part.text}
												</Typography>
											))}
										</Typography>
										<Typography variant="p" color={'gris'}>
											{fullNameParts.map((part, index) => (
												<Typography
													key={index}
													variant="span"
													weight={part.highlight ? 'extrabold' : 'light'}
												>
													{part.text}
												</Typography>
											))}
										</Typography>
									</div>
								</li>
							)
						})}
				</ul>
			</div>
		</>
	)
}
