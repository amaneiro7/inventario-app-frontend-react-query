import { BASIC_COLORS_MAP } from '@/shared/lib/utils/colores'
import { Sector } from '@/shared/ui/Charts'
import type { PieSectorShapeProps } from '@/shared/ui/Charts'

export const MyCustomPie = (props: PieSectorShapeProps) => (
	<Sector {...props} fill={BASIC_COLORS_MAP[props.index % BASIC_COLORS_MAP.length]} />
)
