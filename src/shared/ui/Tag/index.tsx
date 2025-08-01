import {
	type ColorType,
	type ParagraphOption,
	type BackgroundType,
	type AlignType
} from '../Typography/types'
import Typography from '../Typography'

interface TagProps {
	icon?: React.JSX.Element
	option?: ParagraphOption
	iconText?: string | number
	color?: ColorType
	backgroundColor?: BackgroundType
	align?: AlignType
}

export function Tag({
	icon,
	color,
	iconText,
	option,
	align = 'left',
	backgroundColor
}: React.PropsWithChildren<TagProps>) {
	return (
		<Typography
			color={color}
			option={option}
			variant="span"
			align={align}
			className="w-fit inline-flex items-center gap-1 rounded-2xl px-2"
			background={backgroundColor}
		>
			<>
				{icon}
				{iconText}
			</>
		</Typography>
	)
}
