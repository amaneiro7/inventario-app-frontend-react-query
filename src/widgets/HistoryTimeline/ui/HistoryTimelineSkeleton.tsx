export const HistoryTimelineSkeleton = () => {
	return (
		<div className="space-y-4">
			<div className="h-10 w-full animate-pulse rounded-md bg-gray-200" />
			<div className="space-y-2">
				{[1, 2, 3].map(i => (
					<div key={i} className="h-16 w-full animate-pulse rounded-md bg-gray-100" />
				))}
			</div>
		</div>
	)
}
