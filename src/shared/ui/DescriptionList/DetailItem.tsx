import { cn } from '@/shared/lib/utils'
import Typography from '../Typography'

export const DetailItem = ({
	label,
	classNameBox,
	classNameText,
	value
}: {
	label: string
	value: string | string[] | React.ReactNode
	classNameBox?: HTMLElement['className']
	classNameText?: HTMLElement['className']
}) => (
	<div className={cn('flex flex-col items-start justify-start py-1.5', classNameBox)}>
		<Typography variant="p" option="tiny" weight="semibold" color="azul">
			{label}:
		</Typography>
		{Array.isArray(value) ? (
			value.map((text, index) => (
				<DetailText key={`detailItem-${index}`} value={text} className={classNameText} />
			))
		) : (
			<DetailText value={value} className={classNameText} />
		)}
	</div>
)

const DetailText = ({
	value,
	className
}: {
	value: string | React.ReactNode
	className?: string
}) => (
	<Typography variant="p" color="gris" option="tiny" className={cn('ml-2 select-all', className)}>
		{value || '--'}
	</Typography>
)
