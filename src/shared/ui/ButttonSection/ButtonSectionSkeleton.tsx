export const ButtonSectionSkeleton = () => {
	return (
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
	)
}
