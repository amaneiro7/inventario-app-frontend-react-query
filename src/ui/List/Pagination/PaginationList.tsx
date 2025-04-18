import { memo } from 'react'
import ReactPaginate from 'react-paginate'
import { ArrowRightBadgeIcon } from '@/icon/ArrowRightBadge'
import './PaginationList.css'

export const PaginationList = memo(
	({
		totalPages = 0,
		currentPage = 1,
		handlePageClick
	}: {
		totalPages?: number
		currentPage?: number
		handlePageClick: ({ selected }: { selected: number }) => void
	}) => {
		if (totalPages <= 1) {
			return null
		}
		return (
			<ReactPaginate
				pageCount={totalPages}
				pageRangeDisplayed={5}
				marginPagesDisplayed={1}
				forcePage={currentPage - 1}
				previousLabel={<ArrowRightBadgeIcon className="h-5 rotate-180" />}
				nextLabel={<ArrowRightBadgeIcon className="h-5" />}
				breakClassName="page-break"
				renderOnZeroPageCount={null}
				onPageChange={handlePageClick}
				containerClassName="pageList-container"
				pageClassName="page"
				pageLinkClassName="page-link"
				activeClassName="active"
				previousClassName="page"
				nextClassName="page"
			/>
		)
	}
)
