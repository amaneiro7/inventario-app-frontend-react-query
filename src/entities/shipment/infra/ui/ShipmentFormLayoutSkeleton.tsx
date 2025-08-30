export const ShipmentFormSkeletonLayout = () => (
	<>
		{/* Inputs */}
		<div className="flex w-full flex-col gap-4">
			<div className="mb-5 h-10 animate-pulse rounded bg-gray-200" />
			<div className="grid gap-4 md:grid-cols-2">
				<div className="mb-5 h-10 animate-pulse rounded bg-gray-200" />
				<div>
					<div className="h-10 animate-pulse rounded bg-gray-400" />
					<div className="h-10 animate-pulse rounded bg-gray-200" />
				</div>
			</div>
		</div>
	</>
)
