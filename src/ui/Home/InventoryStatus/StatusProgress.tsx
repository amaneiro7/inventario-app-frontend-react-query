import { Progress } from '@/components/Progress'
import Typography from '@/components/Typography'

interface StatusProgressProps
	extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
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
	total,
	id,
	...props
}) => {
	const percentageValue = total > 0 ? Number(((value * 100) / total).toFixed(2)) : 0
	return (
		<div {...props} className="mb-3 w-full space-y-1.5">
			<div className="flex justify-between">
				<Typography id={id} variant="span" weight="bold">
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
				aria-valuemax={100}
				aria-valuemin={0}
				aria-valuenow={percentageValue}
				role="progressbar"
				data-state="indeterminate"
				data-max="100"
			/>
		</div>
	)
}
