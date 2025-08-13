export const PrimaryFilterSkeleton = ({ inputQuantity = 6 }: { inputQuantity?: number }) => {
	return (
		<>
			{Array.from({ length: inputQuantity }).map((_, index) => (
				<div key={index} className="mb-5 h-10 animate-pulse rounded bg-gray-200" />
			))}
		</>
	)
}
