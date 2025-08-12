export const EmployeeFormSkeletonLayout = () => (
	<>
		<div className="flex flex-col gap-4">
			{/* Inputs */}
			<div className="grid grid-cols-2 gap-5">
				{/* Main Info */}
				<div className="flex flex-col gap-2 rounded-lg border border-gray-400 p-8 pt-4">
					{/* primer titulo */}
					<div className="h-6 w-1/2 animate-pulse rounded bg-gray-200" />
					<div className="mb-5 h-10 animate-pulse rounded bg-gray-200" />
					<div className="mb-5 h-10 animate-pulse rounded bg-gray-200" />
					{/* checkbox */}
					<div className="flex w-3/5 flex-row gap-2">
						<div className="border-gray h-5 w-5 animate-pulse rounded border p-1" />
						<div className="h-5 w-full animate-pulse rounded bg-gray-200" />
					</div>
					{/* segundo titulo */}
					<div className="h-6 w-1/2 animate-pulse rounded bg-gray-200" />
					<div className="gap-4 md:grid md:grid-cols-2">
						<div className="mb-5 h-10 animate-pulse rounded bg-gray-200" />
						<div className="mb-5 h-10 animate-pulse rounded bg-gray-200" />
					</div>
					<div className="mb-5 h-10 animate-pulse rounded bg-gray-200" />
					<div className="gap-4 md:grid md:grid-cols-2">
						<div className="mb-5 h-10 animate-pulse rounded bg-gray-200" />
						<div className="mb-5 h-10 animate-pulse rounded bg-gray-200" />
					</div>
				</div>

				<div className="flex flex-col gap-2 rounded-lg border border-gray-400 p-8 pt-4">
					{/* segundo titulo */}
					<div className="h-6 w-1/2 animate-pulse rounded bg-gray-200" />
					<div className="mb-5 h-10 animate-pulse rounded bg-gray-200" />
					<div className="mb-5 h-10 animate-pulse rounded bg-gray-200" />
					<div className="mb-5 h-10 animate-pulse rounded bg-gray-200" />
					<div className="mb-5 h-10 animate-pulse rounded bg-gray-200" />
					<div className="mb-5 h-10 animate-pulse rounded bg-gray-200" />
					<div className="mb-5 h-10 animate-pulse rounded bg-gray-200" />
					{/* Phone */}
					<div className="flex flex-row justify-between">
						<div className="h-6 w-1/3 animate-pulse rounded bg-gray-200" />
						<div className="h-6 w-1/3 animate-pulse rounded bg-gray-200" />
					</div>
					<div className="grid grid-cols-[1fr_auto] gap-2">
						<div className="mb-5 h-10 animate-pulse rounded bg-gray-200" />
						<div className="h-10 w-10 animate-pulse rounded-full bg-gray-300" />
					</div>
					{/* Extension */}
					<div className="flex flex-row justify-between">
						<div className="h-6 w-1/3 animate-pulse rounded bg-gray-200" />
						<div className="h-6 w-1/3 animate-pulse rounded bg-gray-200" />
					</div>
					<div className="grid grid-cols-[1fr_auto] gap-2">
						<div className="mb-5 h-10 animate-pulse rounded bg-gray-200" />
						<div className="h-10 w-10 animate-pulse rounded-full bg-gray-300" />
					</div>
				</div>
			</div>
		</div>
	</>
)
