import Typography from '@/shared/ui/Typography'
import { type DeviceDto } from '@/entities/devices/devices/domain/dto/Device.dto'
import { type Highlight } from './RenderComboboxOption'

export function DeviceRenderOption<O>({
	option,
	inputValue,
	highlight
}: {
	option: O
	inputValue?: string
	highlight: Highlight<O>
}) {
	const parts = highlight(option, inputValue).map((part, index) => ({
		...part,
		id: index
	}))
	const opt = option as unknown as DeviceDto
	return (
		<div>
			<Typography variant="p">
				{parts.map(part => (
					<Typography
						key={part.id}
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
				{`${opt.category.name} - ${opt.brand.name} - ${opt.model.name}`}
			</Typography>
		</div>
	)
}
