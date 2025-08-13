import { lazy, Suspense } from 'react'
import { eventManager } from '@/shared/lib/utils/eventManager'
import { OrderTypes } from '@/entities/shared/domain/criteria/OrderType'
import { LoadingTable } from '@/shared/ui/Table/LoadingTable'
import { type Headers } from '@/shared/ui/Table/TableHeader'

const Table = lazy(() => import('@/shared/ui/Table/Table').then(m => ({ default: m.Table })))
const TableBody = lazy(() =>
	import('@/shared/ui/Table/TableBody').then(m => ({ default: m.TableBody }))
)
const TableHead = lazy(() =>
	import('@/shared/ui/Table/TableHead').then(m => ({ default: m.TableHead }))
)
const TablePageWrapper = lazy(() =>
	import('@/shared/ui/Table/TablePageWrapper').then(m => ({ default: m.TablePageWrapper }))
)
const TableRow = lazy(() =>
	import('@/shared/ui/Table/TableRow').then(m => ({ default: m.TableRow }))
)
const TabsNav = lazy(() => import('@/shared/ui/Tabs/TabsNav').then(m => ({ default: m.TabsNav })))
const TypeOfSiteTabNav = lazy(() =>
	import('@/features/type-of-site-tab-nav/ui/TypeOfSiteTabNav').then(m => ({
		default: m.TypeOfSiteTabNav
	}))
)
const PaginationBar = lazy(() =>
	import('@/shared/ui/Pagination/PaginationBar').then(m => ({ default: m.PaginationBar }))
)
const TableHeader = lazy(() =>
	import('@/shared/ui/Table/TableHeader').then(m => ({ default: m.TableHeader }))
)

interface TableLayoutProps<T> {
	children?: React.ReactElement<T>
	total?: number
	pageSize?: number
	pageNumber?: number
	defaultPageSize?: number
	typeOfSiteId?: string
	isLoading?: boolean
	isError?: boolean
	pageSizeOptions: number[]
	totalPage?: number
	page?: number
	colSpan: number
	orderBy?: string
	orderType?: OrderTypes
	dataIsLoaded: boolean
	headers: Headers[]
	handleSort: (field: string) => Promise<void>
	handleChange: (name: string, value: string) => void
	handlePageClick: ({ selected }: { selected: number }) => void
	handlePageSize: (pageSize: number) => void
}

export function TableLayout<T>({
	children,
	defaultPageSize,
	pageNumber,
	pageSize,
	total,
	typeOfSiteId,
	isLoading,
	isError,
	dataIsLoaded,
	pageSizeOptions,
	totalPage,
	page,
	colSpan,
	orderBy,
	orderType,
	headers,
	handleChange,
	handleSort,
	handlePageClick,
	handlePageSize
}: TableLayoutProps<T>) {
	return (
		<>
			<TablePageWrapper>
				<TabsNav
					isLoading={isLoading}
					total={total}
					pageSize={pageSize}
					pageNumber={pageNumber}
					defaultPageSize={defaultPageSize}
				>
					<TypeOfSiteTabNav handleChange={handleChange} value={typeOfSiteId} />
				</TabsNav>
				<Table>
					<TableHeader>
						<TableRow>
							{headers
								.filter(header => header.visible)
								.map((header, index) => (
									<TableHead
										aria-colindex={index}
										key={header.key}
										isTab={header.isTab}
										handleSort={
											header.hasOrder ? eventManager(handleSort) : undefined
										}
										name={header.label}
										orderBy={header.hasOrder ? orderBy : undefined}
										orderType={header.hasOrder ? orderType : undefined}
										orderByField={header.hasOrder ? header.key : undefined}
										size={header.size}
									/>
								))}
						</TableRow>
					</TableHeader>
					<TableBody>
						<>
							{isLoading && (
								<LoadingTable registerPerPage={pageSize} colspan={colSpan} />
							)}
							<Suspense
								fallback={
									<LoadingTable registerPerPage={pageSize} colspan={colSpan} />
								}
							>
								{children}
							</Suspense>
						</>
					</TableBody>
				</Table>
			</TablePageWrapper>
			{dataIsLoaded && !isLoading && !isError && (
				<PaginationBar
					registerOptions={pageSizeOptions}
					totalPages={totalPage}
					total={total}
					currentPage={page}
					pageSize={pageSize}
					handlePageClick={handlePageClick}
					handlePageSize={handlePageSize}
				/>
			)}
		</>
	)
}
