export const ModelFormSkeletonLayout = () => (
	<>
		{/* Inputs */}
		<div className="flex w-full flex-col gap-4">
			<div className="grid w-full grid-cols-2 gap-5">
				{/* Info */}
				<div className="flex flex-col gap-4 rounded-lg border border-gray-400 p-8 pt-4">
					<div className="h-6 w-1/2 animate-pulse rounded bg-gray-200" />
					<div className="mb-5 h-10 animate-pulse rounded bg-gray-200" />
					<div className="mb-5 h-10 animate-pulse rounded bg-gray-200" />
					<div className="mb-5 h-10 animate-pulse rounded bg-gray-200" />
				</div>
				{/* Clasify */}
				<div className="flex flex-col gap-4 rounded-lg border border-gray-400 p-8 pt-4">
					<div className="h-6 w-1/2 animate-pulse rounded bg-gray-200" />
					<div className="mb-5 h-10 animate-pulse rounded bg-gray-200" />
					{/* checkbox */}
					<div className="flex flex-row gap-2">
						<div className="border-gray h-5 w-5 rounded border p-1" />
						<div className="h-5 w-1/2 animate-pulse rounded bg-gray-200" />
					</div>
				</div>
			</div>
		</div>
	</>
)


const ComputerFeaturesSkeleton = () => (
	<>
		{/* Inputs */}
		<div className="mb-5 grid gap-4 md:grid-cols-2">
			<div className="h-10 animate-pulse rounded bg-gray-200" />
			<div className="h-10 animate-pulse rounded bg-gray-200" />
		</div>

		<div className="grid grid-flow-row gap-4 md:grid-cols-3">
			{/* checkbox */}
			<div className="flex h-8 flex-row gap-2">
				<div className="border-gray h-5 w-5 rounded border p-1" />
				<div className="h-5 w-1/2 animate-pulse rounded bg-gray-200" />
			</div>
			<div className="flex h-8 flex-row gap-2">
				<div className="border-gray h-5 w-5 rounded border p-1" />
				<div className="h-5 w-1/2 animate-pulse rounded bg-gray-200" />
			</div>
			<div className="flex h-8 flex-row gap-2">
				<div className="border-gray h-5 w-5 rounded border p-1" />
				<div className="h-5 w-1/2 animate-pulse rounded bg-gray-200" />
			</div>
			<div className="flex h-8 flex-row gap-2">
				<div className="border-gray h-5 w-5 rounded border p-1" />
				<div className="h-5 w-1/2 animate-pulse rounded bg-gray-200" />
			</div>
			<div className="flex h-8 flex-row gap-2">
				<div className="border-gray h-5 w-5 rounded border p-1" />
				<div className="h-5 w-1/2 animate-pulse rounded bg-gray-200" />
			</div>
		</div>

		<div className="grid gap-4 md:grid-cols-2">
			<div className="mb-5 h-10 animate-pulse rounded bg-gray-200" />
			<div>
				<div className="h-10 animate-pulse rounded bg-gray-400" />
				<div className="h-10 animate-pulse rounded bg-gray-200" />
				<div className="h-10 animate-pulse rounded bg-gray-200" />
			</div>
		</div>
	</>
)

const KeyboardFeaturesSkeleton = () => (
	<>
		{/* Inputs */}
		<div className="flex w-full items-center gap-4">
			<div className="mr-1 h-10 w-full animate-pulse rounded bg-gray-200" />
			<div className="flex h-8 w-60 flex-row gap-2">
				<div className="border-gray h-5 w-5 rounded border p-1" />
				<div className="h-5 w-full animate-pulse rounded bg-gray-200" />
			</div>
		</div>
	</>
)

const PrinterFeaturesSkeleton = () => (
	<>
		{/* Inputs */}
		<div className="flex w-full items-center gap-4">
			<div className="mr-1 h-10 w-full animate-pulse rounded bg-gray-200" />
		</div>
	</>
)

const ScreensFeaturesSkeleton = () => (
	<>
		{/* Inputs */}
		<div className="grid gap-4 md:grid-cols-2">
			<div className="mr-1 h-10 w-full animate-pulse rounded bg-gray-200" />
			<div className="grid grid-flow-row gap-4 md:grid-cols-2">
				<div className="flex h-8 w-60 flex-row gap-2">
					<div className="border-gray h-5 w-5 rounded border p-1" />
					<div className="h-5 w-full animate-pulse rounded bg-gray-200" />
				</div>
				<div className="flex h-8 w-60 flex-row gap-2">
					<div className="border-gray h-5 w-5 rounded border p-1" />
					<div className="h-5 w-full animate-pulse rounded bg-gray-200" />
				</div>
				<div className="flex h-8 w-60 flex-row gap-2">
					<div className="border-gray h-5 w-5 rounded border p-1" />
					<div className="h-5 w-full animate-pulse rounded bg-gray-200" />
				</div>
			</div>
		</div>
	</>
)

const SKELETONS = {
	computer: <ComputerFeaturesSkeleton />,
	keyboard: <KeyboardFeaturesSkeleton />,
	printer: <PrinterFeaturesSkeleton />,
	screens: <ScreensFeaturesSkeleton />,
	form: <ModelFormSkeletonLayout />
}

interface ModelSkeletonProps {
	type: keyof typeof SKELETONS
}

export const ModelSkeleton = ({ type }: ModelSkeletonProps) => {
	return SKELETONS[type]
}