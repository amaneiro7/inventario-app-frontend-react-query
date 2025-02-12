import { lazy } from 'react'

const PaginationList = lazy(async () =>
	import('./PaginationList').then(m => ({ default: m.PaginationList }))
)
const RecordPerPage = lazy(async () =>
	import('./RecordPerPage').then(m => ({ default: m.RecordPerPage }))
)

export function PaginationBar({
	totalPages,
	currentPage,
	total,
	handlePageClick,
	handlePageSize,
	pageSize,
	registerOptions
}: {
	totalPages?: number
	currentPage?: number
	pageSize?: number
	total?: number
	registerOptions: number[]
	handlePageClick: ({ selected }: { selected: number }) => void
	handlePageSize: (pageSize: number) => void
}) {
	return (
		<nav aria-label="pagination-bar" className="flex justify-between items-center">
			<RecordPerPage
				pageSize={pageSize}
				total={total}
				registerOptions={registerOptions}
				handlePageSize={handlePageSize}
			/>
			<PaginationList
				totalPages={totalPages}
				currentPage={currentPage}
				handlePageClick={handlePageClick}
			/>
		</nav>
	)
}
