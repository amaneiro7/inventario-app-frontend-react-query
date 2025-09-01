import { lazy, memo, Suspense } from 'react'
import { ShipmentGetByCriteria } from '@/entities/shipment/application/ShipmentGetByCriteria'
import { useGetAllShipments } from '@/entities/shipment/infra/hooks/useGetAllShipment'
import { eventManager } from '@/shared/lib/utils/eventManager'
import { LoadingTable } from '@/shared/ui/Table/LoadingTable'
import { type ShipmentFilters } from '@/entities/shipment/application/createShipmentQueryParams'
import { useTableShipmentWrapper } from './useTableShipmentWrapper'

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

const TableShipment = lazy(() =>
	import('@/entities/shipment/infra/ui/TableShipment').then(m => ({ default: m.TableShipment }))
)

interface TableShipmentWrapperProps {
	query: ShipmentFilters
	handlePageSize: (pageSize: number) => void
	handlePageClick: ({ selected }: { selected: number }) => void
	handleSort: (field: string) => Promise<void>
}

export const TableShipmentWrapper = memo(
	({ query, handleSort, handlePageSize, handlePageClick }: TableShipmentWrapperProps) => {
		const { data: shipments, isError, isLoading } = useGetAllShipments(query)
		const { headers, visibleColumns, colSpan } = useTableShipmentWrapper()

		return (
			<>
				<TablePageWrapper>
					<TabsNav
						isLoading={isLoading}
						total={shipments?.info?.total}
						pageSize={query.pageSize}
						pageNumber={query.pageNumber}
						defaultPageSize={ShipmentGetByCriteria.defaultPageSize}
					/>

					<Table>
						<TableHeader>
							<TableRow>
								{headers
									.filter(header => header.visible)
									.map((header, index) => (
										<TableHead
											aria-colindex={index + 1}
											key={header.key}
											isTab={header.isTab}
											handleSort={
												header.hasOrder
													? eventManager(handleSort)
													: undefined
											}
											name={header.label}
											orderBy={header.hasOrder ? query.orderBy : undefined}
											orderType={
												header.hasOrder ? query.orderType : undefined
											}
											orderByField={header.hasOrder ? header.key : undefined}
											size={header.size}
										/>
									))}
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
								{shipments !== undefined && (
									<Suspense
										fallback={
											<LoadingTable
												registerPerPage={query?.pageSize}
												colspan={colSpan}
											/>
										}
									>
										<TableShipment
											colSpan={colSpan}
											isError={isError}
											shipments={shipments.data}
											visibleColumns={visibleColumns}
										/>
									</Suspense>
								)}
							</>
						</TableBody>
					</Table>
				</TablePageWrapper>
				{shipments && !isLoading && !isError && (
					<PaginationBar
						registerOptions={ShipmentGetByCriteria.pageSizeOptions}
						totalPages={shipments?.info?.totalPage}
						total={shipments?.info?.total}
						currentPage={shipments?.info?.page}
						pageSize={query.pageSize}
						handlePageClick={handlePageClick}
						handlePageSize={handlePageSize}
					/>
				)}
			</>
		)
	}
)

TableShipmentWrapper.displayName = 'TableShipmentWrapper'
