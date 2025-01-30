import parse from 'autosuggest-highlight/parse'
import match from 'autosuggest-highlight/match'
import { type AutocompleteRenderOptionState } from '@mui/material'

type Props = React.HTMLAttributes<HTMLLIElement> & { key: any }

export function RenderOption<Value>(
	props: Props,
	option: Value,
	state: AutocompleteRenderOptionState
) {
	const matches = match(option.name, state.inputValue, {
		insideWords: true
	})
	const parts = parse(option.name, matches)
	const { key, ...resProps } = props
	return (
		<li key={key} {...resProps}>
			<div>
				{parts.map((part, index) => (
					<span
						key={index}
						style={{
							fontWeight: part.highlight ? 700 : 400
						}}
					>
						{part.text}
					</span>
				))}
			</div>
		</li>
	)
}
