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
				/**
				 * @prop {number} pageCount - The total number of pages.
				 */
				pageCount={totalPages}
				/**
				 * @prop {number} pageRangeDisplayed - The number of page links to show around the current page.
				 */
				pageRangeDisplayed={5}
				/**
				 * @prop {number} marginPagesDisplayed - The number of page links to show at the beginning and end of the pagination.
				 */
				marginPagesDisplayed={1}
				/**
				 * @prop {number} forcePage - The initially selected page (zero-based index).
				 */
				forcePage={currentPage - 1}
				/**
				 * @prop {JSX.Element} previousLabel - The label for the previous page button (an icon in this case).
				 */
				previousLabel={<ArrowRightBadgeIcon className="h-5 rotate-180" />}
				/**
				 * @prop {JSX.Element} nextLabel - The label for the next page button (an icon in this case).
				 */
				nextLabel={<ArrowRightBadgeIcon className="h-5" />}
				/**
				 * @prop {string} breakClassName - The CSS class name for the break links (e.g., "...").
				 */
				breakClassName="page-break"
				/**
				 * @prop {null} renderOnZeroPageCount - Determines what to render when `pageCount` is zero. Set to null to render nothing.
				 */
				renderOnZeroPageCount={null}
				/**
				 * @prop {function({ selected: number }): void} onPageChange - The callback function invoked when a page is clicked.
				 * Receives an object with the zero-based index of the selected page.
				 */
				onPageChange={handlePageClick}
				/**
				 * @prop {string} containerClassName - The CSS class name for the pagination container.
				 */
				containerClassName="pageList-container"
				/**
				 * @prop {string} pageClassName - The CSS class name for each page number link.
				 */
				pageClassName="page"
				/**
				 * @prop {string} pageLinkClassName - The CSS class name for the anchor tag inside each page number link.
				 */
				pageLinkClassName="page-link"
				/**
				 * @prop {string} activeClassName - The CSS class name applied to the active page link.
				 */
				activeClassName="active"
				/**
				 * @prop {string} previousClassName - The CSS class name for the previous page button.
				 */
				previousClassName="page"
				/**
				 * @prop {string} nextClassName - The CSS class name for the next page button.
				 */
				nextClassName="page"
			/>
		)
	}
)
