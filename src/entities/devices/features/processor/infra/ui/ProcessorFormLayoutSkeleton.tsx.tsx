export const ProcessorFormSkeletonLayout = () => (
	<>
		{/* Inputs */}
		<div className="flex w-full flex-col gap-4">
			<div className="mb-5 h-10 animate-pulse rounded bg-gray-200" />
			<div className="mb-5 h-10 animate-pulse rounded bg-gray-200" />
			<div className="mb-5 grid grid-cols-[1fr_1fr_auto] items-center gap-4">
				<div className="h-10 animate-pulse rounded bg-gray-200" />
				<div className="h-10 animate-pulse rounded bg-gray-200" />

				{/* checkbox */}
				<div className="flex w-36 flex-row gap-2">
					<div className="border-gray h-5 w-5 rounded border p-1" />
					<div className="h-5 w-full animate-pulse rounded bg-gray-200" />
				</div>
			</div>
		</div>
	</>
)
