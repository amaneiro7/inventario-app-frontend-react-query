import { cn } from '@/shared/lib/utils'

export const DetailItem = ({
	label,
	className,
	value
}: {
	label: string
	value: string | React.ReactNode
	className?: string
}) => (
	<div className="flex flex-col items-start justify-start py-1.5">
		<p className="text-sm font-semibold text-blue-600">{label}:</p>
		<p className={cn('ml-2 text-sm text-black', className)}>{value || '--'}</p>
	</div>
)