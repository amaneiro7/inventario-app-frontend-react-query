import { lazy, memo, Suspense, useMemo } from 'react'
import { HistoryGetByCriteria } from '@/entities/history/application/HistoryGetByCriteria'
import { useGetAllHistorys } from '@/entities/history/infra/hook/useGetAllHistory'
import { eventManager } from '@/shared/lib/utils/eventManager'
import { HistoryTableLoading } from './HistoryTableLoading'
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
		const SkeletonFallback = useMemo(() => {
			return Array.from({
				length: query.pageSize ?? HistoryGetByCriteria.defaultPageSize
			}).map((_, index) => <HistoryTableLoading key={`loader-${index}`} />)
		}, [query.pageSize, HistoryGetByCriteria.defaultPageSize])
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
								>
									Realizado por
								</TableHead>
								<TableHead
									aria-colindex={2}
									handleSort={eventManager(handleSort)}
									orderBy={query.orderBy}
									orderType={query.orderType}
									orderByField="action"
									size="small"
									className="hidden md:table-cell"
								>
									Acción
								</TableHead>
								<TableHead
									aria-colindex={3}
									handleSort={eventManager(handleSort)}
									orderBy={query.orderBy}
									orderType={query.orderType}
									orderByField="categoryId"
									size="small"
									className="hidden lg:table-cell"
								>
									Categoria
								</TableHead>
								<TableHead
									aria-colindex={4}
									handleSort={eventManager(handleSort)}
									orderBy={query.orderBy}
									orderType={query.orderType}
									orderByField="serial"
									size="small"
								>
									Serial
								</TableHead>
								<TableHead
									aria-colindex={5}
									handleSort={eventManager(handleSort)}
									orderBy={query.orderBy}
									orderType={query.orderType}
									orderByField="updatedAt"
									size="small"
									className="hidden lg:table-cell"
								>
									Fecha de Actualización
								</TableHead>
								<TableHead aria-colindex={6} size="xSmall">
									<span className="sr-only">Acciones</span>
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							<>
								{isLoading && SkeletonFallback}
								{histories !== undefined && (
									<Suspense fallback={SkeletonFallback}>
										<TableHistory
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
