import { lazy, memo, Suspense, useMemo } from 'react'
import { eventManager } from '@/shared/lib/utils/eventManager'
import { DeviceComputerFilter } from '@/entities/devices/devices/application/computerFilter/DeviceComputerFilter'
import { Table } from '@/shared/ui/Table/Table'
import { TableBody } from '@/shared/ui/Table/TableBody'
import { TableHead } from '@/shared/ui/Table/TableHead'
import { TableHeader } from '@/shared/ui/Table/TableHeader'
import { TablePageWrapper } from '@/shared/ui/Table/TablePageWrapper'
import { TableRow } from '@/shared/ui/Table/TableRow'
import { TypeOfSiteTabNav } from '@/features/type-of-site-tab-nav/ui/TypeOfSiteTabNav'
import { PaginationBar } from '@/shared/ui/Pagination/PaginationBar'
import { TabsNav } from '@/shared/ui/Tabs/TabsNav'
import { DeviceMonitoringTableLoading } from './DeviceMonitoringTableLoading'
import { type DeviceMonitoringFilters } from '@/entities/devices/deviceMonitoring/application/createDeviceMonitoringQueryParams'
import { type Response } from '@/entities/shared/domain/methods/Response'
import { type DeviceMonitoring } from '@/entities/devices/deviceMonitoring/domain/dto/DeviceMonitoring.dto'

interface DeviceMonitoringContainerProps {
	query: DeviceMonitoringFilters
	handlePageSize: (pageSize: number) => void
	handlePageClick: ({ selected }: { selected: number }) => void
	handleSort: (field: string) => Promise<void>
	handleChange: (name: string, value: string | number) => void
	deviceMonitorings: Response<DeviceMonitoring> | undefined
	isError: boolean
	isLoading: boolean
}

const TableDeviceMonitoring = lazy(() =>
	import('@/widgets/monitoring/DeviceMonitoring/ui/TableDeviceMonitoring').then(m => ({
		default: m.TableDeviceMonitoring
	}))
)

export const DeviceMonitoringContainer = memo(
	({
		query,
		deviceMonitorings,
		isError,
		isLoading,
		handleSort,
		handleChange,
		handlePageSize,
		handlePageClick
	}: DeviceMonitoringContainerProps) => {
		const SkeletonFallback = useMemo(() => {
			return Array.from({
				length: query.pageSize ?? DeviceComputerFilter.defaultPageSize
			}).map((_, index) => <DeviceMonitoringTableLoading key={`loader-${index}`} />)
		}, [query.pageSize, DeviceComputerFilter.defaultPageSize])
		return (
			<>
				<TablePageWrapper>
					<TabsNav
						isLoading={isLoading}
						total={deviceMonitorings?.info?.total}
						pageSize={query.pageSize}
						pageNumber={query.pageNumber}
						defaultPageSize={DeviceComputerFilter.defaultPageSize}
					>
						<TypeOfSiteTabNav
							handleChange={handleChange}
							value={query.typeOfSiteId}
							omit={['ALMACEN']}
						/>
					</TabsNav>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead aria-colindex={1} size="small" isTab>
									Estado
								</TableHead>
								<TableHead
									aria-colindex={2}
									handleSort={eventManager(handleSort)}
									orderBy={query.orderBy}
									orderType={query.orderType}
									orderByField="computerName"
									size="xLarge"
									isTab
								>
									Nombre de Equipo
								</TableHead>
								<TableHead
									aria-colindex={3}
									handleSort={eventManager(handleSort)}
									orderBy={query.orderBy}
									orderType={query.orderType}
									orderByField="ipAddress"
									size="small"
									isTab
									className="hidden sm:table-cell"
								>
									Dirección IP
								</TableHead>
								<TableHead
									aria-colindex={4}
									handleSort={eventManager(handleSort)}
									orderBy={query.orderBy}
									orderType={query.orderType}
									orderByField="locationId"
									size="xxLarge"
									isTab
									className="2md:table-cell hidden"
								>
									Ubicación
								</TableHead>
								<TableHead
									aria-colindex={5}
									handleSort={eventManager(handleSort)}
									orderBy={query.orderBy}
									orderType={query.orderType}
									orderByField="lastSuccess"
									size="small"
									isTab
									className="hidden lg:table-cell"
								>
									Última Conexión
								</TableHead>
								<TableHead
									aria-colindex={6}
									handleSort={eventManager(handleSort)}
									orderBy={query.orderBy}
									orderType={query.orderType}
									orderByField="lastFailed"
									size="small"
									isTab
									className="hidden xl:table-cell"
								>
									Última Desconexión
								</TableHead>
								<TableHead
									aria-colindex={7}
									handleSort={eventManager(handleSort)}
									orderBy={query.orderBy}
									orderType={query.orderType}
									orderByField="lastScan"
									size="small"
									isTab
									className="1xl:table-cell hidden"
								>
									Último escaneo
								</TableHead>

								<TableHead aria-colindex={8} isTab size="xSmall">
									<span className="sr-only">Acciones</span>
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							<>
								{isLoading && SkeletonFallback}
								{deviceMonitorings !== undefined && (
									<Suspense fallback={SkeletonFallback}>
										<TableDeviceMonitoring
											isError={isError}
											devices={deviceMonitorings.data}
										/>
									</Suspense>
								)}
							</>
						</TableBody>
					</Table>
				</TablePageWrapper>
				{deviceMonitorings && !isLoading && !isError && (
					<PaginationBar
						registerOptions={DeviceComputerFilter.pageSizeOptions}
						totalPages={deviceMonitorings?.info?.totalPage}
						total={deviceMonitorings?.info?.total}
						currentPage={deviceMonitorings?.info?.page}
						pageSize={query.pageSize}
						handlePageClick={handlePageClick}
						handlePageSize={handlePageSize}
					/>
				)}
			</>
		)
	},
	(prevProps, nextProps) =>
		prevProps.query === nextProps.query &&
		prevProps.handleSort === nextProps.handleSort &&
		prevProps.handleChange === nextProps.handleChange &&
		prevProps.handlePageSize === nextProps.handlePageSize &&
		prevProps.handlePageClick === nextProps.handlePageClick &&
		prevProps.isLoading === nextProps.isLoading &&
		prevProps.isError === nextProps.isError &&
		prevProps.deviceMonitorings === nextProps.deviceMonitorings
)
