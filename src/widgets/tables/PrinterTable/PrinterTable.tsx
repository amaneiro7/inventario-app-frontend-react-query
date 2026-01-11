import { lazy, memo, Suspense, useMemo } from 'react'
import { eventManager } from '@/shared/lib/utils/eventManager'
import { useTableGenericDeviceBody } from '@/entities/devices/devices/infra/ui/DeviceTable/useTableGenericDeviceBody'
import { useGetAllPrinterDevices } from '@/entities/devices/devices/infra/hook/useGetAllPrinterDevices'
import { DevicePrinterFilter } from '@/entities/devices/devices/application/printer/DevicePrinterFilter'
import { LoadingPrinterRow } from './LoadingPrinterRow'
import { type DeviceBaseFilters } from '@/entities/devices/devices/application/createDeviceQueryParams'
import { type DeviceDto } from '@/entities/devices/devices/domain/dto/Device.dto'

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

const TableGenericDeviceBody = lazy(() =>
	import('@/entities/devices/devices/infra/ui/DeviceTable/TableGenericDeviceBody').then(m => ({
		default: m.TableGenericDeviceBody
	}))
)

const TableDevicePrinter = lazy(() =>
	import('@/entities/devices/devices/infra/ui/DeviceTable/TableDevicePrinter').then(m => ({
		default: m.TableDevicePrinter
	}))
)
interface TablePrinterWrapperProps {
	query: DeviceBaseFilters
	handlePageSize: (pageSize: number) => void
	handlePageClick: ({ selected }: { selected: number }) => void
	handleSort: (field: string) => Promise<void>
	handleChange: (name: string, value: string | number) => void
}

export const TablePrinterWrapper = memo(
	({
		query,
		handleSort,
		handleChange,
		handlePageSize,
		handlePageClick
	}: TablePrinterWrapperProps) => {
		const { devices, isError, isLoading } = useGetAllPrinterDevices(query)
		const { dialogRef, handleCloseModal, handleViewDetails, selectedDevice } =
			useTableGenericDeviceBody<DeviceDto>()

		const SkeletonFallback = useMemo(() => {
			return Array.from({
				length: query.pageSize ?? DevicePrinterFilter.defaultPageSize
			}).map((_, index) => <LoadingPrinterRow key={`loader-${index}`} />)
		}, [query.pageSize, DevicePrinterFilter.defaultPageSize])
		return (
			<>
				<TablePageWrapper>
					<TabsNav
						isLoading={isLoading}
						total={devices?.info?.total}
						pageSize={query.pageSize}
						pageNumber={query.pageNumber}
						defaultPageSize={DevicePrinterFilter.defaultPageSize}
					>
						<TypeOfSiteTabNav handleChange={handleChange} value={query.typeOfSiteId} />
					</TabsNav>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead
									aria-colindex={1}
									isTab
									handleSort={eventManager(handleSort)}
									orderBy={query.orderBy}
									orderType={query.orderType}
									orderByField="employeeId"
									size="small"
									className="2lg:table-cell hidden"
								>
									Usuario
								</TableHead>
								<TableHead
									aria-colindex={2}
									isTab
									handleSort={eventManager(handleSort)}
									orderBy={query.orderBy}
									orderType={query.orderType}
									orderByField="locationId"
									size="xLarge"
									// className="hidden md:table-cell"
								>
									Ubicación
								</TableHead>
								<TableHead
									aria-colindex={3}
									isTab
									handleSort={eventManager(handleSort)}
									orderBy={query.orderBy}
									orderType={query.orderType}
									orderByField="ipAddress"
									size="small"
									// className="hidden md:table-cell"
								>
									Dirección IP
								</TableHead>
								<TableHead
									aria-colindex={4}
									className="1md:table-cell hidden"
									isTab
									handleSort={eventManager(handleSort)}
									orderBy={query.orderBy}
									orderType={query.orderType}
									orderByField="serial"
									size="medium"
								>
									Serial
								</TableHead>
								<TableHead
									aria-colindex={5}
									isTab
									handleSort={eventManager(handleSort)}
									orderBy={query.orderBy}
									orderType={query.orderType}
									orderByField="categoryId"
									size="xLarge"
									className="1lg:table-cell hidden"
								>
									Categoria
								</TableHead>
								<TableHead
									aria-colindex={6}
									isTab
									handleSort={eventManager(handleSort)}
									orderBy={query.orderBy}
									orderType={query.orderType}
									orderByField="brandId"
									size="small"
									className="hidden md:table-cell"
								>
									Marca
								</TableHead>
								<TableHead
									aria-colindex={7}
									className="1sm:table-cell hidden"
									isTab
									handleSort={eventManager(handleSort)}
									orderBy={query.orderBy}
									orderType={query.orderType}
									orderByField="modelId"
									size="medium"
								>
									Modelo
								</TableHead>
								<TableHead
									aria-colindex={8}
									isTab
									handleSort={eventManager(handleSort)}
									orderBy={query.orderBy}
									orderType={query.orderType}
									orderByField="observation"
									size="auto"
									className="1xl:table-cell hidden"
								>
									Observaciones
								</TableHead>
								<TableHead aria-colindex={9} isTab size="xSmall">
									<span className="sr-only">Acciones</span>
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{isLoading && SkeletonFallback}
							{
								<Suspense fallback={SkeletonFallback}>
									<TableGenericDeviceBody
										dialogRef={dialogRef}
										handleCloseModal={handleCloseModal}
										selectedDevice={selectedDevice}
										isError={isError}
										devices={devices?.data}
									>
										{devices !== undefined && (
											<TableDevicePrinter
												handleViewDetails={handleViewDetails}
												devices={devices.data}
											/>
										)}
									</TableGenericDeviceBody>
								</Suspense>
							}
						</TableBody>
					</Table>
				</TablePageWrapper>
				{devices && !isLoading && !isError && (
					<PaginationBar
						registerOptions={DevicePrinterFilter.pageSizeOptions}
						totalPages={devices?.info?.totalPage}
						total={devices?.info?.total}
						currentPage={devices?.info?.page}
						pageSize={query.pageSize}
						handlePageClick={handlePageClick}
						handlePageSize={handlePageSize}
					/>
				)}
			</>
		)
	}
)

TablePrinterWrapper.displayName = 'TablePrinterWrapper'
