import { cn } from '@/shared/lib/utils'
import Typography from '@/shared/ui/Typography'
import { type TransformType } from '@/shared/ui/Typography/types'

export const DetailItem = ({
	label,
	value,
	transform
}: {
	label: string
	value: React.ReactNode
	transform?: TransformType
}) => (
	<Typography color="gris" option="small" variant="p">
		{label}: <strong className={cn(transform)}>{value}</strong>
	</Typography>
)
