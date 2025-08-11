export const FormSkeletonLayout = ({ children }: React.PropsWithChildren) => (
	<>
		{/* Search Input */}
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
		{/* Inputs */}
		<div className="flex w-full flex-col items-center gap-3 rounded-2xl bg-white p-4 shadow-sm">
			<div className="relative grid min-h-64 w-full gap-5">
				{/* Inputs */}
				{children ? children : <Default />}
				{/* Buttons */}
				<div className="mt-8 flex flex-col justify-end gap-5 justify-self-end md:w-1/3 md:flex-row">
					<div className="h-11 w-32 animate-pulse rounded bg-gray-200" />
					<div className="h-11 w-32 animate-pulse rounded bg-gray-200" />
					<div className="h-11 w-32 animate-pulse rounded bg-gray-200" />
				</div>
			</div>
		</div>
		{/* Steps */}
		<div className="flex w-full flex-col gap-3 rounded-2xl bg-white p-4 shadow-sm">
			<div className="h-5 w-32 animate-pulse rounded bg-gray-200" />
			<div className="flex flex-row items-center gap-2">
				<div className="h-6 w-6 animate-pulse rounded-full bg-gray-200" />
				<div className="h-5 w-2/5 animate-pulse rounded bg-gray-200" />
				<div className="h-6 w-36 animate-pulse rounded-full bg-gray-200" />
			</div>
			<div className="flex flex-row items-center gap-2">
				<div className="h-6 w-6 animate-pulse rounded-full bg-gray-200" />
				<div className="h-5 w-4/12 animate-pulse rounded bg-gray-200" />
				<div className="h-6 w-36 animate-pulse rounded-full bg-gray-200" />
			</div>
			<div className="flex flex-row items-center gap-2">
				<div className="h-6 w-6 animate-pulse rounded-full bg-gray-200" />
				<div className="h-5 w-2/5 animate-pulse rounded bg-gray-200" />
				<div className="h-6 w-36 animate-pulse rounded-full bg-gray-200" />
			</div>
		</div>
	</>
)

function Default() {
	return (
		<div className="flex w-full flex-col gap-4">
			<div className="grid w-full grid-cols-2 gap-5">
				{/* Info */}
				<div className="flex flex-col gap-4 rounded-lg border border-gray-400 p-8 pt-4">
					<div className="h-6 w-1/2 animate-pulse rounded bg-gray-200" />
					<div className="mb-5 h-10 animate-pulse rounded bg-gray-200" />
					<div className="mb-5 h-10 animate-pulse rounded bg-gray-200" />
					<div className="mb-5 h-10 animate-pulse rounded bg-gray-200" />
					<div className="mb-5 h-10 animate-pulse rounded bg-gray-200" />
					<div className="mb-5 h-10 animate-pulse rounded bg-gray-200" />
					<div className="mb-5 h-10 animate-pulse rounded bg-gray-200" />
				</div>
				{/* Clasify */}
				<div className="flex flex-col gap-4 rounded-lg border border-gray-400 p-8 pt-4">
					<div className="h-6 w-1/2 animate-pulse rounded bg-gray-200" />
					<div className="mb-5 h-10 animate-pulse rounded bg-gray-200" />
					<div className="mb-5 h-10 animate-pulse rounded bg-gray-200" />
					<div className="mb-5 h-10 animate-pulse rounded bg-gray-200" />
					<div className="mb-5 h-10 animate-pulse rounded bg-gray-200" />
					<div className="mb-5 h-10 animate-pulse rounded bg-gray-200" />
				</div>
			</div>
		</div>
	)
}
