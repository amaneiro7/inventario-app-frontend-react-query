import Typography from '@/shared/ui/Typography'
import { type SiteDto } from '@/entities/locations/site/domain/dto/Site.dto'
import { type Highlight } from './RenderComboboxOption'

export function SiteRenderOption<O>({
	option,
	inputValue,
	highlight
}: {
	option: O
	inputValue?: string
	highlight: Highlight<O>
}) {
	const parts = highlight(option, inputValue)
	const opt = option as unknown as SiteDto
	return (
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
			<Typography variant="p" option="tiny" color="gris">
				{`${opt.city?.state?.region?.name} - ${opt.city?.state?.name} - ${opt.city?.name}`}
			</Typography>
		</div>
	)
}
