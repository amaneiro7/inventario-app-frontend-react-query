import { DefaultRenderOption } from './DefaultRenderOption'

export type Highlight<O> = (
	option: O,
	inputValue?: string
) => {
	text: string
	highlight: boolean
}[]

interface RenderComboboxOptionProps<O> {
	option: O
	inputValue?: string
	highlight: Highlight<O>
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
export function RenderComboboxOption<O>({
	highlight,
	option,
	inputValue,
	renderOption
}: RenderComboboxOptionProps<O>) {
	if (renderOption) {
		return renderOption({ option, inputValue, highlight })
	}
	return <DefaultRenderOption option={option} highlight={highlight} inputValue={inputValue} />
}
