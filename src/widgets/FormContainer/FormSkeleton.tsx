export const FormSkeleton = () => (
	<div className="rounded-lg border border-gray-200 bg-white shadow-sm">
		<div className="flex items-center justify-between border-b border-gray-200 p-4">
			<div className="h-6 w-1/3 animate-pulse rounded bg-gray-200"></div>
			<div className="h-8 w-1/4 animate-pulse rounded bg-gray-200"></div>
		</div>
		<div className="p-6">
			<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
				<div className="h-10 animate-pulse rounded bg-gray-200"></div>
				<div className="h-10 animate-pulse rounded bg-gray-200"></div>
				<div className="h-10 animate-pulse rounded bg-gray-200 md:col-span-2"></div>
				<div className="h-10 animate-pulse rounded bg-gray-200"></div>
				<div className="h-10 animate-pulse rounded bg-gray-200"></div>
				<div className="h-10 animate-pulse rounded bg-gray-200 md:col-span-2"></div>
			</div>
		</div>
		<div className="flex justify-end space-x-4 border-t border-gray-200 p-4">
			<div className="h-10 w-24 animate-pulse rounded bg-gray-200"></div>
			<div className="h-10 w-24 animate-pulse rounded bg-gray-200"></div>
		</div>
	</div>
)
