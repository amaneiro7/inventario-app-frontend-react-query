import { BASIC_COLORS_MAP } from '@/shared/lib/utils/colores'
import { Sector } from '@/shared/ui/Charts'
import type { PieSectorShapeProps } from '@/shared/ui/Charts'

interface MyCustomPieProps extends PieSectorShapeProps {
	colors?: string[]
}

export const MyCustomPie = ({ colors, ...props }: MyCustomPieProps) => {
	const fill = colors
		? colors[props.index % colors.length]
		: BASIC_COLORS_MAP[props.index % BASIC_COLORS_MAP.length]

	return <Sector {...props} fill={fill} />
}
