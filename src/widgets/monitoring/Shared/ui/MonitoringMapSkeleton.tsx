export const MonitoringMapSkeleton = ({ pageSize }: { pageSize?: number }) => {
	const skeletonCount = pageSize || 16
	return (
		<div className="grid grid-cols-3 gap-4 overflow-y-auto pr-2 pb-16 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
			{Array.from({ length: skeletonCount }).map((_, index) => (
				<div
					key={`skeletons-${index}`}
					className="relative flex min-h-24 animate-pulse flex-col items-center justify-center gap-1 rounded-md border border-gray-300 bg-white p-2"
				>
					<div className="h-6 w-6 rounded-full bg-gray-300" />
					<div className="h-4 w-full rounded bg-gray-300" />
					<div className="h-4 w-1/2 rounded bg-gray-300" />
				</div>
			))}
		</div>
	)
}
