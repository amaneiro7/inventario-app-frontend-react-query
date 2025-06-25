export const NetworkLinkListSkeleton = () => {
	return (
		<div className="animate-pulse space-y-2">
			<div className="mb-4 h-4 w-3/4 rounded bg-gray-200"></div>

			<div className="max-h-[300px] space-y-1 overflow-hidden">
				{Array.from({ length: 5 }).map((_, index) => (
					<div
						key={index}
						className="flex items-center justify-between rounded border border-gray-200 p-2 text-xs"
					>
						<div className="h-3 w-2/3 rounded bg-gray-200"></div>
						<div className="h-4 w-12 rounded-full bg-gray-200"></div>
					</div>
				))}
			</div>
		</div>
	)
}
