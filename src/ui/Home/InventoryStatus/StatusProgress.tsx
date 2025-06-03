import { Progress } from '@/components/Progress'
import Typography from '@/components/Typography'

interface StatusProgressProps {
	value?: number
	label: string
	backgroundColor?: string
	indicatorColor?: string
	total: number
}

export const StatusProgress: React.FC<StatusProgressProps> = ({
	value = 0,
	label,
	backgroundColor,
	indicatorColor,
	total
}) => {
	const percentageValue = total > 0 ? Number(((value * 100) / total).toFixed(2)) : 0
	return (
		<div className="mb-3 space-y-1.5">
			<div className="flex justify-between">
				<Typography variant="span" weight="bold">
					{label}
				</Typography>
				<Typography
					variant="span"
					option="tiny"
					color="gris"
				>{`${value} / ${total}  (${percentageValue}%)`}</Typography>
			</div>
			<Progress
				value={percentageValue}
				backgroundColor={backgroundColor}
				indicatorColor={indicatorColor}
			/>
		</div>
	)
}
