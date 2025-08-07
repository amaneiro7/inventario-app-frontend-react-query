export const SignatureGeneratorSkeleton = () => (
	<div className="grid gap-4 md:grid-cols-2">
		<div className="space-y-6 rounded-lg border border-gray-200 p-6">
			<div className="h-6 w-1/3 animate-pulse rounded bg-gray-200"></div>
			<div className="h-10 animate-pulse rounded bg-gray-200"></div>
			<div className="h-10 animate-pulse rounded bg-gray-200"></div>
			<div className="h-10 animate-pulse rounded bg-gray-200"></div>
		</div>
		<div className="space-y-6">
			<div className="h-48 w-full animate-pulse rounded-lg border border-gray-200 p-6"></div>
			<div className="h-32 w-full animate-pulse rounded-lg border border-gray-200 p-6"></div>
		</div>
	</div>
)
