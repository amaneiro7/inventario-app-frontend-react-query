import { lazy } from 'react'
import { useListBoxNavigation } from './hook/useListBoxNavigation'
import { OptionList } from './OptionList'
import { type Highlight } from './RenderOption/RenderComboboxOption'

const SearchBar = lazy(async () => import('./SearchBar').then(m => ({ default: m.SearchBar })))

interface Props<T extends string | number | readonly string[], O extends { id: string }>
	extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	options: O[]
	value: T
	name: string
	loading: boolean
	inputValue?: string
	open: boolean
	searchField?: boolean
	required?: boolean
	onInputChange?: (value: string) => void
	handleOptionClick: (option: O) => void
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
}

export function ListBox<O extends { id: string }, T extends string | number | readonly string[]>({
	id,
	options,
	name,
	inputValue,
	open,
	loading,
	searchField = true,
	displayAccessor,
	highlightFunction,
	renderOption,
	onInputChange,
	handleOptionClick
}: Props<T, O>) {
	const { listRef, selectedIndex } = useListBoxNavigation({
		options,
		open,
		onSelect: handleOptionClick
	})

	return (
		<>
			<div
				id={`combobox-${id}`}
				key={id}
				role="combobox"
				className={`div-popover ${open ? 'open' : 'close'}`}
			>
				{searchField && onInputChange ? (
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
					<OptionList
						options={options}
						inputValue={inputValue}
						selectedIndex={selectedIndex}
						onOptionClick={handleOptionClick}
						loading={loading}
						displayAccessor={displayAccessor}
						highlightFunction={highlightFunction}
						renderOption={renderOption}
					/>
				</ul>
			</div>
		</>
	)
}
