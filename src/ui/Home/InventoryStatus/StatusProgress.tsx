import { Progress } from '@/components/Progress'

interface StatusProgressProps {
	value?: number
	label: string
	color: string
	total: number
}

export const StatusProgress: React.FC<StatusProgressProps> = ({
	value = 0,
	label,
	color,
	total
}) => {
	const percentageValue = total > 0 ? Number(((value * 100) / total).toFixed(2)) : 0
	return (
		<div className="mb-3 space-y-1.5">
			<div className="flex justify-between text-sm">
				<span className="font-medium">{label}</span>
				<span className="text-slate-500">{percentageValue}%</span>
			</div>
			<Progress value={percentageValue} className={`h-2 ${color}`} />
		</div>
	)
}
