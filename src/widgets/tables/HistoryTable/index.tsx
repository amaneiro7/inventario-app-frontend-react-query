import { lazy, memo, Suspense } from 'react'
import { HistoryGetByCriteria } from '@/entities/history/application/HistoryGetByCriteria'
import { useGetAllHistorys } from '@/entities/history/infra/hook/useGetAllHistory'
import { eventManager } from '@/shared/lib/utils/eventManager'
import { LoadingTable } from '@/shared/ui/Table/LoadingTable'
import { type HistoryFilters } from '@/entities/history/application/createHistoryQueryParams'

const Table = lazy(() => import('@/shared/ui/Table/Table').then(m => ({ default: m.Table })))
const TableBody = lazy(() =>
	import('@/shared/ui/Table/TableBody').then(m => ({ default: m.TableBody }))
)
const TableHead = lazy(() =>
	import('@/shared/ui/Table/TableHead').then(m => ({ default: m.TableHead }))
)
const TableHeader = lazy(() =>
	import('@/shared/ui/Table/TableHeader').then(m => ({ default: m.TableHeader }))
)
const TablePageWrapper = lazy(() =>
	import('@/shared/ui/Table/TablePageWrapper').then(m => ({ default: m.TablePageWrapper }))
)

const TableRow = lazy(() =>
	import('@/shared/ui/Table/TableRow').then(m => ({ default: m.TableRow }))
)

const TabsNav = lazy(() => import('@/shared/ui/Tabs/TabsNav').then(m => ({ default: m.TabsNav })))
const PaginationBar = lazy(() =>
	import('@/shared/ui/Pagination/PaginationBar').then(m => ({ default: m.PaginationBar }))
)

interface TableHistoryWrapperProps {
	query: HistoryFilters
	handlePageSize: (pageSize: number) => void
	handlePageClick: ({ selected }: { selected: number }) => void
	handleSort: (field: string) => Promise<void>
}

const TableHistory = lazy(() =>
	import('@/entities/history/infra/ui/TableHistory').then(m => ({ default: m.TableHistory }))
)

export const TableHistoryWrapper = memo(
	({ query, handleSort, handlePageSize, handlePageClick }: TableHistoryWrapperProps) => {
		const { data: histories, isError, isLoading } = useGetAllHistorys(query)
		const colSpan = 6
		return (
			<>
				<TablePageWrapper>
					<TabsNav
						isLoading={isLoading}
						total={histories?.info?.total}
						pageSize={query.pageSize}
						pageNumber={query.pageNumber}
						defaultPageSize={HistoryGetByCriteria.defaultPageSize}
					/>

					<Table>
						<TableHeader>
							<TableRow>
								<TableHead
									aria-colindex={1}
									handleSort={eventManager(handleSort)}
									orderBy={query.orderBy}
									orderType={query.orderType}
									orderByField="userId"
									size="medium"
									name="Realizado por"
								/>
								<TableHead
									aria-colindex={2}
									handleSort={eventManager(handleSort)}
									orderBy={query.orderBy}
									orderType={query.orderType}
									orderByField="action"
									size="small"
									name="Acción"
								/>
								<TableHead
									aria-colindex={3}
									handleSort={eventManager(handleSort)}
									orderBy={query.orderBy}
									orderType={query.orderType}
									orderByField="categoryId"
									size="small"
									name="Categoria"
								/>
								<TableHead
									aria-colindex={4}
									handleSort={eventManager(handleSort)}
									orderBy={query.orderBy}
									orderType={query.orderType}
									orderByField="serial"
									size="small"
									name="Serial"
								/>
								<TableHead
									aria-colindex={5}
									handleSort={eventManager(handleSort)}
									orderBy={query.orderBy}
									orderType={query.orderType}
									orderByField="updatedAt"
									size="small"
									name="Fecha de Actualización"
								/>
								<TableHead aria-colindex={6} size="xxSmall" name="" />
							</TableRow>
						</TableHeader>
						<TableBody>
							<>
								{isLoading && (
									<LoadingTable
										registerPerPage={query?.pageSize}
										colspan={colSpan}
									/>
								)}
								{histories !== undefined && (
									<Suspense
										fallback={
											<LoadingTable
												registerPerPage={query?.pageSize}
												colspan={colSpan}
											/>
										}
									>
										<TableHistory
											colSpan={colSpan}
											isError={isError}
											histories={histories.data}
										/>
									</Suspense>
								)}
							</>
						</TableBody>
					</Table>
				</TablePageWrapper>
				{histories && !isLoading && !isError && (
					<PaginationBar
						registerOptions={HistoryGetByCriteria.pageSizeOptions}
						totalPages={histories?.info?.totalPage}
						total={histories?.info?.total}
						currentPage={histories?.info?.page}
						pageSize={query.pageSize}
						handlePageClick={handlePageClick}
						handlePageSize={handlePageSize}
					/>
				)}
			</>
		)
	}
)

TableHistoryWrapper.displayName = 'TableHistoryWrapper'
