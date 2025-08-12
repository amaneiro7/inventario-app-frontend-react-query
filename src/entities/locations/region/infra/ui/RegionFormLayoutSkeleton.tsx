export const RegionFormLayoutSkeleton = () => {
	return (
		<div className="flex w-full flex-col gap-3 rounded-2xl bg-white p-4 shadow-sm">
			<div className="flex flex-row items-center gap-2">
				<div className="h-5 w-80 animate-pulse rounded bg-gray-200" />
				<div className="h-6 w-36 animate-pulse rounded-full bg-gray-200" />
			</div>
			<div className="mb-6 flex flex-row items-center gap-2">
				<div className="h-6 w-20 animate-pulse rounded bg-gray-200"></div>
				<div className="h-10 w-96 animate-pulse rounded rounded-e-full bg-gray-200"></div>
			</div>
		</div>
	)
}
