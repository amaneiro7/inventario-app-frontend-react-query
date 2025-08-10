export const FormSkeletonLayout = () => (
	<>
		<div className="flex w-full flex-col gap-3 rounded-2xl bg-white p-4 shadow-sm">
			<div className="flex flex-row items-center gap-2">
				<div className="h-5 w-80 animate-pulse rounded bg-gray-200" />
				<div className="h-6 w-36 animate-pulse rounded-full bg-gray-200" />
			</div>
			<div className="flex flex-row items-center gap-2">
				<div className="h-6 w-20 animate-pulse rounded bg-gray-200"></div>
				<div className="h-10 w-96 animate-pulse rounded rounded-e-full bg-gray-200"></div>
			</div>
		</div>
		<div className="flex w-full flex-col items-center gap-3 rounded-2xl bg-white p-4 shadow-sm">
			<div className="grid w-full grid-cols-1 gap-4 rounded-lg border border-gray-400 p-8 pt-4 md:grid-cols-2">
				<div className="h-10 animate-pulse rounded bg-gray-200" />
				<div className="h-10 animate-pulse rounded bg-gray-200" />
				<div className="h-10 animate-pulse rounded bg-gray-200" />
				<div className="h-10 animate-pulse rounded bg-gray-200" />
				<div className="h-10 animate-pulse rounded bg-gray-200" />
				<div className="h-10 animate-pulse rounded bg-gray-200" />
				<div className="h-10 animate-pulse rounded bg-gray-200" />
				<div className="h-10 animate-pulse rounded bg-gray-200" />
			</div>
			<div className="flex flex-row gap-2 self-end">
				<div className="h-10 w-28 animate-pulse rounded bg-gray-200" />
				<div className="h-10 w-28 animate-pulse rounded bg-gray-200" />
				<div className="h-10 w-28 animate-pulse rounded bg-gray-200" />
			</div>
		</div>
		<div className="flex w-full flex-col gap-3 rounded-2xl bg-white p-4 shadow-sm">
			<div className="h-5 w-32 animate-pulse rounded bg-gray-200" />
			<div className="flex flex-row items-center gap-2">
				<div className="h-6 w-6 animate-pulse rounded-full bg-gray-200" />
				<div className="h-5 w-1/4 animate-pulse rounded bg-gray-200" />
				<div className="h-6 w-36 animate-pulse rounded-full bg-gray-200" />
			</div>
			<div className="flex flex-row items-center gap-2">
				<div className="h-6 w-6 animate-pulse rounded-full bg-gray-200" />
				<div className="h-5 w-1/5 animate-pulse rounded bg-gray-200" />
				<div className="h-6 w-36 animate-pulse rounded-full bg-gray-200" />
			</div>
			<div className="flex flex-row items-center gap-2">
				<div className="h-6 w-6 animate-pulse rounded-full bg-gray-200" />
				<div className="h-5 w-1/4 animate-pulse rounded bg-gray-200" />
				<div className="h-6 w-36 animate-pulse rounded-full bg-gray-200" />
			</div>
		</div>
	</>
)
