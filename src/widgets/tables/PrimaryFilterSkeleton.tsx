export const PrimaryFilterSkeleton = ({ inputQuantity = 6 }: { inputQuantity?: number }) => {
	return (
		<search>
			<form className="relative grid h-10 min-h-min w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
				{Array.from({ length: inputQuantity }).map((_, index) => (
					<div key={index} className="mb-5 h-10 animate-pulse rounded bg-gray-200" />
				))}
			</form>
		</search>
	)
}
