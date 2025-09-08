import { lazy, memo, Suspense, useMemo } from 'react'
import { ShipmentGetByCriteria } from '@/entities/shipment/application/ShipmentGetByCriteria'
import { useGetAllShipments } from '@/entities/shipment/infra/hooks/useGetAllShipment'
import { eventManager } from '@/shared/lib/utils/eventManager'
import { ShipmentTableLoading } from './ShipmentTableLoading'
import { type ShipmentFilters } from '@/entities/shipment/application/createShipmentQueryParams'

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

		const SkeletonFallback = useMemo(() => {
			return Array.from({
				length: query.pageSize ?? ShipmentGetByCriteria.defaultPageSize
			}).map((_, index) => <ShipmentTableLoading key={`loader-${index}`} />)
		}, [query.pageSize, ShipmentGetByCriteria.defaultPageSize])

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
								<TableHead
									aria-colindex={1}
									handleSort={eventManager(handleSort)}
									orderBy={query.orderBy}
									orderType={query.orderType}
									orderByField="shipmentCode"
									size="small"
								>
									Código de envio
								</TableHead>
								<TableHead
									aria-colindex={2}
									handleSort={eventManager(handleSort)}
									orderBy={query.orderBy}
									orderType={query.orderType}
									orderByField="status"
									size="xSmall"
									className="xs:table-cell hidden"
								>
									Estatus
								</TableHead>
								<TableHead
									aria-colindex={3}
									handleSort={eventManager(handleSort)}
									orderBy={query.orderBy}
									orderType={query.orderType}
									orderByField="sentBy"
									size="small"
									className="hidden 2xl:table-cell"
								>
									Enviado por
								</TableHead>
								<TableHead
									aria-colindex={4}
									handleSort={eventManager(handleSort)}
									orderBy={query.orderBy}
									orderType={query.orderType}
									orderByField="origin"
									size="large"
									className="1xl:table-cell hidden"
								>
									Origen
								</TableHead>
								<TableHead
									aria-colindex={5}
									handleSort={eventManager(handleSort)}
									orderBy={query.orderBy}
									orderType={query.orderType}
									orderByField="destination"
									size="large"
									className="2md:table-cell hidden"
								>
									Destino
								</TableHead>
								<TableHead
									aria-colindex={6}
									handleSort={eventManager(handleSort)}
									orderBy={query.orderBy}
									orderType={query.orderType}
									orderByField="reason"
									size="xSmall"
									className="hidden lg:table-cell"
								>
									Motivo
								</TableHead>
								<TableHead
									aria-colindex={7}
									size="xSmall"
									className="2lg:table-cell hidden"
								>
									N° de Equipos
								</TableHead>
								<TableHead
									aria-colindex={8}
									handleSort={eventManager(handleSort)}
									orderBy={query.orderBy}
									orderType={query.orderType}
									orderByField="shipmentDate"
									size="small"
									className="hidden md:table-cell"
								>
									Fecha de Envio
								</TableHead>
								<TableHead
									aria-colindex={9}
									handleSort={eventManager(handleSort)}
									orderBy={query.orderBy}
									orderType={query.orderType}
									orderByField="deliveryDate"
									size="small"
									className="2md:table-cell hidden"
								>
									Fecha de Entrega
								</TableHead>
								<TableHead aria-colindex={10} isTab size="xSmall">
									<span className="sr-only">Acciones</span>
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							<>
								{isLoading && SkeletonFallback}

								{shipments !== undefined && (
									<Suspense fallback={SkeletonFallback}>
										<TableShipment
											isError={isError}
											shipments={shipments.data}
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
