import { Skeleton } from '@/shared/ui/skeletons/Skeleton'

export const MonitoringChartSkeleton = () => {
	return (
		<>
			{/* Skeleton for SummaryPieChart */}
			<div className="flex h-96 items-center justify-center">
				<Skeleton className="h-64 w-64 rounded-full" />
			</div>

			{/* Skeleton for StateMonitoringList */}
			<div className="flex flex-col gap-2">
				<Skeleton className="h-8 w-full" />
				{Array.from({ length: 10 }).map((_, index) => (
					<Skeleton key={index} className="h-6 w-full" />
				))}
			</div>
		</>
	)
}
