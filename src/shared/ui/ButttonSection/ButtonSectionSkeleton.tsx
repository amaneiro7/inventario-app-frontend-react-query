export const ButtonSectionSkeleton = ({
	hasDownloadButton = true,
	hasAddButton = true,
	hasClearButton = true,
	hasFilterButton = true
}: {
	hasDownloadButton?: boolean
	hasFilterButton?: boolean
	hasAddButton?: boolean
	hasClearButton?: boolean
}) => {
	return (
		<div className="my-4 flex min-h-8 w-full items-start justify-start gap-2">
			{hasDownloadButton && (
				<div
					className="mb-7 h-8 animate-pulse rounded-md bg-gray-300"
					style={{
						width: '116px'
					}}
				/>
			)}
			{hasAddButton && (
				<div
					className="mb-7 h-8 animate-pulse rounded-md bg-gray-300"
					style={{
						width: '91px'
					}}
				/>
			)}
			{hasClearButton && (
				<div
					className="mb-7 h-8 animate-pulse rounded-md bg-gray-300"
					style={{
						width: '72px'
					}}
				/>
			)}
			{hasFilterButton && (
				<div
					className="mb-7 h-8 animate-pulse rounded-md bg-gray-300"
					style={{
						width: '83px'
					}}
				/>
			)}
		</div>
	)
}
