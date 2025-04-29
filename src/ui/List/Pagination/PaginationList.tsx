import { memo } from 'react'
import ReactPaginate from 'react-paginate'
import { ArrowRightBadgeIcon } from '@/icon/ArrowRightBadge'
import './PaginationList.css'

/**
 * @interface PaginationListProps
 * @description Props for the {@link PaginationList} component.
 * @property {number} [totalPages=0] - The total number of pages available. Defaults to 0.
 * @property {number} [currentPage=1] - The currently active page number (1-based). Defaults to 1.
 * @property {function({ selected: number }): void} handlePageClick - A callback function that is called when a page number is clicked.
 * The argument is an object with a `selected` property representing the zero-based index of the clicked page.
 */
interface PaginationListProps {
	totalPages?: number
	currentPage?: number
	handlePageClick: ({ selected }: { selected: number }) => void
}

/**
 * @component
 * @memo
 * @param {PaginationListProps} props - The component's props.
 * @returns {JSX.Element | null} A React element rendering the pagination controls, or null if there's only one or zero pages.
 * @description Renders a pagination component using the `react-paginate` library.
 * It displays a list of page numbers with "previous" and "next" buttons.
 */
export const PaginationList = memo(
	({ totalPages = 0, currentPage = 1, handlePageClick }: PaginationListProps) => {
		/**
		 * @description If there's only one page or no pages, the pagination component is not rendered.
		 */
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
				ariaLabelBuilder={pageNumber => `Go to page ${pageNumber}`}
				breakLabel="..."
			/>
		)
	}
)
