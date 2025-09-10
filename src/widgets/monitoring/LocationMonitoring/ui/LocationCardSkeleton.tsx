export const LocationCardSkeleton = () => (
	<div
		className="relative flex h-24 animate-pulse flex-col items-center justify-center rounded-md border border-gray-200 bg-gray-50 p-2" // Fixed height for skeleton uniformity
		aria-hidden="true" // Hide from screen readers during loading
	>
		<div className="mb-1 h-6 w-6 rounded-full bg-gray-200"></div> {/* Icon skeleton */}
		<div className="mb-1 h-4 w-3/4 rounded bg-gray-200"></div> {/* Computer name skeleton */}
		<div className="h-3 w-1/2 rounded bg-gray-200"></div> {/* IP address skeleton */}
	</div>
)
