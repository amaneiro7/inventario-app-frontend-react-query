import { lazy, Suspense } from 'react'
import { eventManager } from '@/utils/eventManager'
import { Table } from '@/components/Table/Table'
import { TableBody } from '@/components/Table/TableBody'
import { TableHead } from '@/components/Table/TableHead'
import { TableHeader } from '@/components/Table/TableHeader'
import { TablePageWrapper } from '@/components/Table/TablePageWrapper'
import { TableRow } from '@/components/Table/TableRow'
import { TabsNav } from '../Tab/TabsNav'
import { LoadingTable } from '@/components/Table/LoadingTable'
import { PaginationBar } from '../Pagination/PaginationBar'
import { HistoryGetByCriteria } from '@/core/history/application/HistoryGetByCriteria'
import { useGetAllHistorys } from '@/core/history/infra/hook/useGetAllHistory'
import { type HistoryFilters } from '@/core/history/application/createHistoryQueryParams'

interface TableHistoryWrapperProps {
	query: HistoryFilters
	handlePageSize: (pageSize: number) => void
	handlePageClick: ({ selected }: { selected: number }) => void
	handleSort: (field: string) => Promise<void>
}

const TableHistory = lazy(() =>
	import('@/ui/List/history/TableHistory').then(m => ({ default: m.TableHistory }))
)

export function TableHistoryWrapper({
	query,
	handleSort,
	handlePageSize,
	handlePageClick
}: TableHistoryWrapperProps) {
	const { histories, isError, isLoading } = useGetAllHistorys(query)
	const colSpan = 9
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
								isTab
								aria-colindex={1}
								handleSort={eventManager(handleSort)}
								orderBy={query.orderBy}
								orderType={query.orderType}
								orderByField="userId"
								size="small"
								name="Realizado por"
							/>
							<TableHead
								isTab
								aria-colindex={2}
								handleSort={eventManager(handleSort)}
								orderBy={query.orderBy}
								orderType={query.orderType}
								orderByField="action"
								size="small"
								name="Acción"
							/>
							<TableHead
								isTab
								aria-colindex={3}
								handleSort={eventManager(handleSort)}
								orderBy={query.orderBy}
								orderType={query.orderType}
								orderByField="deviceId"
								size="small"
								name="Serial"
							/>
							<TableHead
								isTab
								aria-colindex={4}
								handleSort={eventManager(handleSort)}
								orderBy={query.orderBy}
								orderType={query.orderType}
								orderByField="updatedAt"
								size="small"
								name="Fecha de Actualización"
							/>
							<TableHead aria-colindex={10} size="xxSmall" name="" />
						</TableRow>
					</TableHeader>
					<TableBody>
						<>
							{isLoading && (
								<LoadingTable registerPerPage={query?.pageSize} colspan={colSpan} />
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
					registerOptions={HistoryGetByCriteria.pegaSizeOptions}
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
