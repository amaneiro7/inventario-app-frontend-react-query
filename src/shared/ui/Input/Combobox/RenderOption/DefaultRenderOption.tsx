import Typography from '@/shared/ui/Typography'
import { type Highlight } from './RenderComboboxOption'

interface DefaultRenderOptionProps<O> {
	option: O
	inputValue?: string
	highlight: Highlight<O>
}

export function DefaultRenderOption<O>({
	option,
	inputValue,
	highlight
}: DefaultRenderOptionProps<O>) {
	const parts = highlight(option, inputValue).map((part, index) => ({
		...part,
		id: index
	}))
	return (
		<Typography variant="p">
			{parts.map(part => (
				<Typography
					key={part.id}
					variant="span"
					option="tiny"
					weight={part.highlight ? 'extrabold' : 'light'}
				>
					{part.text}
				</Typography>
			))}
		</Typography>
	)
}
