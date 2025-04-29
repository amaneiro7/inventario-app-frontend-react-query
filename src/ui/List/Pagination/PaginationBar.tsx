import { PaginationList } from './PaginationList'
import { RecordPerPage } from './RecordPerPage'

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
		<div className="flex items-center justify-between">
			<RecordPerPage
				pageSize={pageSize}
				total={total}
				registerOptions={registerOptions}
				handlePageSize={handlePageSize}
			/>
			<nav aria-label="Paginación">
				<PaginationList
					totalPages={totalPages}
					currentPage={currentPage ?? 1}
					handlePageClick={handlePageClick}
				/>
			</nav>
		</div>
	)
}
