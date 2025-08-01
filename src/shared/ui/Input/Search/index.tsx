import { useCallback, useRef } from 'react'
import { useCloseClickOrEscape } from '@/shared/lib/hooks/useCloseClickOrEscape'
import { useComboboxFocusInputs } from '../Combobox/hook/useComboboxFocusInputs'

import Typography from '@/shared/ui/Typography'
import { SearchLink } from '@/shared/ui/Button/SearchLink'
import { InputBase } from '../InputBase'
import { ListBox } from '../Combobox/ListBox'
import { type Highlight } from '../Combobox/RenderOption/RenderComboboxOption'

interface Props<O extends { id: string }, T extends string | number | readonly string[]> {
	id: string
	title: string
	url: string
	search: string
	loading: boolean
	options: O[]
	value: T
	name: string
	// Props para reutilizar el componente de listbox
	displayAccessor?: string | ((option: O) => string)
	highlightFunction?: (option: O, inputValue?: string) => { text: string; highlight: boolean }[]
	renderOption?: ({
		option,
		inputValue,
		highlight
	}: {
		option: O
		inputValue?: string
		highlight: Highlight<O>
	}) => React.ReactNode
	handleChange: (value: string) => void
	onChangeValue: (value: string) => void
}

export function SearchInput<
	O extends { id: string },
	T extends string | number | readonly string[]
>({
	id,
	title,
	url,
	name,
	value,
	loading,
	options,
	search,
	displayAccessor = 'name',
	highlightFunction,
	renderOption,
	handleChange,
	onChangeValue,
	...props
}: Props<O, T>) {
	const divRef = useRef<HTMLDivElement>(null) // Referencia al contenedor
	const { open, handleInputBlur, handleInputFocus, handlePopoverClose } = useComboboxFocusInputs({
		ref: divRef
	})
	useCloseClickOrEscape({ open, onClose: handlePopoverClose, ref: divRef })

	const completeSearchValueOnClick = useCallback(
		(option: O) => {
			return typeof displayAccessor === 'string'
				? ((option as Record<string, unknown>)[displayAccessor]?.toString() ?? '')
				: displayAccessor(option)
		},
		[displayAccessor]
	)
	const handleOptionClick = useCallback(
		(option: O) => {
			handleChange(completeSearchValueOnClick(option))
			onChangeValue(option.id)
			handlePopoverClose()
		},
		[value, onChangeValue, handlePopoverClose, name]
	)

	const onHandleChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			handleChange(event.target.value)
		},
		[handleChange]
	)

	return (
		<div className="relative flex h-16 w-full items-end md:max-w-sm lg:max-w-md">
			<Typography className="mt-3 self-start pr-2" variant="p" color="gris">
				Buscar:
			</Typography>
			<InputBase
				id={id}
				ref={divRef}
				label={title}
				value={search}
				name={name}
				onFocus={handleInputFocus}
				onBlur={handleInputBlur}
				tabIndex={0}
			>
				<>
					<input
						id={id}
						type="search"
						className="button-popover text-left"
						value={search}
						onChange={onHandleChange}
						{...props}
					/>

					<ListBox
						searchField={false}
						options={options}
						value={value}
						name={name}
						loading={loading}
						open={open}
						displayAccessor={displayAccessor}
						highlightFunction={highlightFunction}
						renderOption={renderOption}
						handleOptionClick={handleOptionClick}
					/>
				</>
			</InputBase>
			<SearchLink
				onClick={() => {
					handleChange('')
				}}
				title={title}
				to={url}
				isDisabled={!search}
			/>
		</div>
	)
}
