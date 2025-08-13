export const ListWrapperSkeleton = () => {
	return (
		<>
			<div className="flex w-full flex-col gap-3 rounded-2xl bg-white p-4 shadow-sm">
				{/* Filter Section */}
				<div className="grid h-10 min-h-min w-full grid-cols-[repeat(auto-fit,250px)] gap-4">
					<div className="mb-5 h-10 animate-pulse rounded bg-gray-300" />
					<div className="mb-5 h-10 animate-pulse rounded bg-gray-300" />
					<div className="mb-5 h-10 animate-pulse rounded bg-gray-300" />
					<div className="mb-5 h-10 animate-pulse rounded bg-gray-300" />
					<div className="mb-5 h-10 animate-pulse rounded bg-gray-300" />
					<div className="mb-5 h-10 animate-pulse rounded bg-gray-300" />
				</div>
				{/* Button Section */}
				<div className="my-4 flex min-h-8 w-full items-start justify-start gap-2">
					<div
						className="mb-7 h-8 animate-pulse rounded-md bg-gray-300"
						style={{
							width: '116px'
						}}
					/>
					<div
						className="mb-7 h-8 animate-pulse rounded-md bg-gray-300"
						style={{
							width: '91px'
						}}
					/>
					<div
						className="mb-7 h-8 animate-pulse rounded-md bg-gray-300"
						style={{
							width: '72px'
						}}
					/>
					<div
						className="mb-7 h-8 animate-pulse rounded-md bg-gray-300"
						style={{
							width: '83px'
						}}
					/>
				</div>
			</div>
		</>
	)
}
