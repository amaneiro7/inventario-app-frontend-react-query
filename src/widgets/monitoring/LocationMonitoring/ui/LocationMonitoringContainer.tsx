import { lazy, memo, Suspense, useMemo } from 'react'
import { eventManager } from '@/shared/lib/utils/eventManager'
import { Table } from '@/shared/ui/Table/Table'
import { TableBody } from '@/shared/ui/Table/TableBody'
import { TableHead } from '@/shared/ui/Table/TableHead'
import { TableHeader } from '@/shared/ui/Table/TableHeader'
import { TablePageWrapper } from '@/shared/ui/Table/TablePageWrapper'
import { TableRow } from '@/shared/ui/Table/TableRow'
import { TabsNav } from '@/shared/ui/Tabs/TabsNav'
import { TypeOfSiteTabNav } from '@/features/type-of-site-tab-nav/ui/TypeOfSiteTabNav'
import { PaginationBar } from '@/shared/ui/Pagination/PaginationBar'
import { LocationMonitoringGetByCriteria } from '@/entities/locations/locationMonitoring/application/LocationMonitoringGetByCriteria'
import { LocationMonitoringTableLoading } from './LocationMonitoringTableLoading'
import { type LocationMonitoring } from '@/entities/locations/locationMonitoring/domain/dto/LocationMonitoring.dto'
import { type Response } from '@/entities/shared/domain/methods/Response'
import { type LocationMonitoringFilters } from '@/entities/locations/locationMonitoring/application/createLocationMonitoringQueryParams'

interface LocationMonitoringContainerProps {
	query: LocationMonitoringFilters
	handlePageSize: (pageSize: number) => void
	handlePageClick: ({ selected }: { selected: number }) => void
	handleSort: (field: string) => Promise<void>
	handleChange: (name: string, value: string | number) => void
	locationMonitorings: Response<LocationMonitoring> | undefined
	isError: boolean
	isLoading: boolean
}

const TableLocationMonitoring = lazy(() =>
	import('@/widgets/monitoring/LocationMonitoring/ui/TableLocationMonitoring').then(m => ({
		default: m.TableLocationMonitoring
	}))
)

export const LocationMonitoringContainer = memo(
	({
		query,
		locationMonitorings,
		isError,
		isLoading,
		handleSort,
		handleChange,
		handlePageSize,
		handlePageClick
	}: LocationMonitoringContainerProps) => {
		const SkeletonFallback = useMemo(() => {
			return Array.from({
				length: query.pageSize ?? LocationMonitoringGetByCriteria.defaultPageSize
			}).map((_, index) => <LocationMonitoringTableLoading key={`loader-${index}`} />)
		}, [query.pageSize, LocationMonitoringGetByCriteria.defaultPageSize])
		return (
			<>
				<TablePageWrapper>
					<TabsNav
						isLoading={isLoading}
						total={locationMonitorings?.info?.total}
						pageSize={query.pageSize}
						pageNumber={query.pageNumber}
						defaultPageSize={LocationMonitoringGetByCriteria.defaultPageSize}
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
									Estatus
								</TableHead>
								<TableHead
									aria-colindex={2}
									handleSort={eventManager(handleSort)}
									orderBy={query.orderBy}
									orderType={query.orderType}
									orderByField="name"
									size="xxLarge"
									isTab
								>
									Nombre del sitio
								</TableHead>
								<TableHead
									aria-colindex={3}
									handleSort={eventManager(handleSort)}
									orderBy={query.orderBy}
									orderType={query.orderType}
									orderByField="subnet"
									size="medium"
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
									orderByField="stateId"
									size="medium"
									isTab
									className="1md:table-cell hidden"
								>
									Estado
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
								{locationMonitorings !== undefined && (
									<Suspense fallback={SkeletonFallback}>
										<TableLocationMonitoring
											isError={isError}
											locations={locationMonitorings.data}
										/>
									</Suspense>
								)}
							</>
						</TableBody>
					</Table>
				</TablePageWrapper>
				{locationMonitorings && !isLoading && !isError && (
					<PaginationBar
						registerOptions={LocationMonitoringGetByCriteria.pageSizeOptions}
						totalPages={locationMonitorings?.info?.totalPage}
						total={locationMonitorings?.info?.total}
						currentPage={locationMonitorings?.info?.page}
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
		prevProps.locationMonitorings === nextProps.locationMonitorings
)

LocationMonitoringContainer.displayName = 'LocationMonitoringContainer'
