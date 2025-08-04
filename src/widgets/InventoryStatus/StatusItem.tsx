interface StatusItemProps {
	icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
	label: string
	value?: number
	color: string
	total: number
}

export const StatusItem: React.FC<StatusItemProps> = ({
	icon: Icon,
	label,
	value = 0,
	color,
	total
}) => (
	<div className="mb-4 flex items-center justify-between">
		<div className="flex items-center">
			<div className={`rounded-full p-1.5 ${color} mr-3`}>
				<Icon className="h-4 w-4 text-white" />
			</div>
			<span className="text-sm font-medium">{label}</span>
		</div>
		<div className="flex items-center">
			<span className="text-sm font-semibold">{value}</span>
			<span className="ml-1.5 text-xs text-slate-500">
				({total > 0 ? ((value * 100) / total).toFixed(2) : '0.00'}%)
			</span>
		</div>
	</div>
)
