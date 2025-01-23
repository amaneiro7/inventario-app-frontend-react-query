import { lazy } from 'react'
import {
	ColorType,
	ParagraphOption,
	type BackgroundType
} from '../Typography/types'

const Typography = lazy(async () => await import('@/components/Typography'))

interface Props {
	icon?: React.JSX.Element
	option?: ParagraphOption
	iconText?: string
	color?: ColorType
	backgroundColor?: BackgroundType
}

export function Tag({
	icon,
	color,
	iconText,
	option,
	backgroundColor
}: React.PropsWithChildren<Props>) {
	return (
		<Typography
			color={color}
			option={option}
			variant="span"
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
