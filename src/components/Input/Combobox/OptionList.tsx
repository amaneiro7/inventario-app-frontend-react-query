import { useMemo } from 'react'
import parse from 'autosuggest-highlight/parse'
import match from 'autosuggest-highlight/match'
import Typography from '@/components/Typography'
import { LiOption } from './LiOption'
import { type Highlight, RenderComboboxOption } from './RenderOption/RenderComboboxOption'

interface OptionListProps<O extends { id: string | number }> {
	options?: O[]
	inputValue?: string
	selectedIndex: number
	onOptionClick: (option: O) => void
	loading: boolean
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

export function OptionList<O extends { id: string | number }>({
	options = [],
	inputValue,
	selectedIndex,
	onOptionClick,
	loading,
	displayAccessor = 'name',
	highlightFunction,
	renderOption
}: OptionListProps<O>) {
	const getDisplayText = (option: O) => {
		if (typeof displayAccessor === 'string') {
			return (option as Record<string, unknown>)[displayAccessor]?.toString() || ''
		}
		return displayAccessor(option)
	}
	const defaultHighlightFunction = (option: O, inputValue?: string) => {
		const text = getDisplayText(option)
		const matches = match(text, inputValue ?? '', { insideWords: true })
		return parse(text, matches)
	}

	const highlight = highlightFunction || defaultHighlightFunction

	const popoverContent = useMemo(() => {
		if (loading) {
			return (
				<li className="w-full rounded py-1 pl-2">
					<Typography variant="span" option="tiny">
						Cargando...
					</Typography>
				</li>
			)
		}

		if (options?.length === 0) {
			return (
				<li className="w-full rounded py-1 pl-2">
					<Typography variant="p" option="tiny">
						No existe
					</Typography>
				</li>
			)
		}
		if (!options) {
			return (
				<li className="w-full rounded py-1 pl-2">
					<Typography variant="p" option="tiny">
						Ha ocurrido un error!
					</Typography>
				</li>
			)
		}

		return options?.map((option, index) => {
			const isSelected = selectedIndex === index
			return (
				<LiOption
					key={option.id}
					option={option}
					index={index}
					isSelected={isSelected}
					onOptionClick={onOptionClick}
				>
					{
						<RenderComboboxOption
							highlight={highlight}
							option={option}
							inputValue={inputValue}
							renderOption={renderOption}
						/>
					}
				</LiOption>
			)
		})
	}, [
		loading,
		options,
		inputValue,
		selectedIndex,
		displayAccessor,
		onOptionClick,
		highlight,
		renderOption
	])

	return <>{popoverContent}</>
}
