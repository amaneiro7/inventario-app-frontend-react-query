export const PieContentFallback = () => {
	return (
		<div className="flex min-h-80 w-full animate-pulse flex-col items-center justify-center gap-6 bg-gray-200 pt-5">
			<div className="size-56 rounded-full bg-gray-400" />
			<div className="flex flex-grow justify-center gap-3">
				<div className="flex flex-row gap-2">
					<div className="flex items-center gap-2">
						<div className="h-3 w-3 rounded-full bg-gray-400" />
						<div className="h-4 w-24 rounded bg-gray-300" />
					</div>
					<div className="flex items-center gap-2">
						<div className="h-3 w-3 rounded-full bg-gray-300" />
						<div className="h-4 w-20 rounded bg-gray-400" />
					</div>
					<div className="flex items-center gap-2">
						<div className="h-3 w-3 rounded-full bg-gray-400" />
						<div className="h-4 w-28 rounded bg-gray-300" />
					</div>
				</div>
			</div>
		</div>
	)
}
