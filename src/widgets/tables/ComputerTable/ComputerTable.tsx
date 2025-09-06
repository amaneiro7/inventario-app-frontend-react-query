import { lazy, memo, Suspense } from 'react'
import { useGetAllComputerDevices } from '@/entities/devices/devices/infra/hook/useGetAllComputerDevices'
import { eventManager } from '@/shared/lib/utils/eventManager'
import { DeviceComputerFilter } from '@/entities/devices/devices/application/computerFilter/DeviceComputerFilter'
import { LoadingTable } from '@/shared/ui/Table/LoadingTable'
import { type DeviceBaseFilters } from '@/entities/devices/devices/application/createDeviceQueryParams'
import { useTableComputer } from './useTableComputer'

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

const TypeOfSiteTabNav = lazy(() =>
	import('@/features/type-of-site-tab-nav/ui/TypeOfSiteTabNav').then(m => ({
		default: m.TypeOfSiteTabNav
	}))
)
const TableDevice = lazy(() =>
	import('@/entities/devices/devices/infra/ui/DeviceTable/TableDevice').then(m => ({
		default: m.TableDevice
	}))
)

interface TableWrapperProps {
	query: DeviceBaseFilters
	handlePageSize: (pageSize: number) => void
	handlePageClick: ({ selected }: { selected: number }) => void
	handleSort: (field: string) => Promise<void>
	handleChange: (name: string, value: string | number) => void
}

export const TableWrapper = memo(
	({ query, handleSort, handleChange, handlePageSize, handlePageClick }: TableWrapperProps) => {
		const { devices, isError, isLoading } = useGetAllComputerDevices({ query })
		const { colSpan } = useTableComputer()

		return (
			<>
				<TablePageWrapper>
					<TabsNav
						isLoading={isLoading}
						total={devices?.info?.total}
						pageSize={query.pageSize}
						pageNumber={query.pageNumber}
						defaultPageSize={DeviceComputerFilter.defaultPageSize}
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
									size="large"
									className="hidden xl:table-cell"
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
								>
									Dirección IP
								</TableHead>
								<TableHead
									aria-colindex={4}
									className="hidden md:table-cell"
									isTab
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
									isTab
									handleSort={eventManager(handleSort)}
									orderBy={query.orderBy}
									orderType={query.orderType}
									orderByField="categoryId"
									size="small"
									className="1xl:table-cell hidden"
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
									className="hidden lg:table-cell"
								>
									Marca
								</TableHead>
								<TableHead
									aria-colindex={7}
									className="hidden sm:table-cell"
									isTab
									handleSort={eventManager(handleSort)}
									orderBy={query.orderBy}
									orderType={query.orderType}
									orderByField="modelId"
									size="xLarge"
								>
									Modelo
								</TableHead>
								<TableHead
									aria-colindex={8}
									isTab
									handleSort={eventManager(handleSort)}
									orderBy={query.orderBy}
									orderType={query.orderType}
									orderByField="computerName"
									size="small"
									className="hidden lg:table-cell"
								>
									Nombre de Equipo
								</TableHead>
								<TableHead
									aria-colindex={9}
									isTab
									handleSort={eventManager(handleSort)}
									orderBy={query.orderBy}
									orderType={query.orderType}
									orderByField="operatingSystem"
									size="medium"
									className="hidden 2xl:table-cell"
								>
									Sistema Operativo
								</TableHead>
								<TableHead
									aria-colindex={10}
									isTab
									handleSort={eventManager(handleSort)}
									orderBy={query.orderBy}
									orderType={query.orderType}
									orderByField="observation"
									size="auto"
									className="3xl:table-cell hidden"
								>
									Observaciones
								</TableHead>
								<TableHead aria-colindex={11} isTab size="xSmall">
									<span className="sr-only">Acciones</span>
								</TableHead>
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
								{devices !== undefined && (
									<Suspense
										fallback={
											<LoadingTable
												registerPerPage={query?.pageSize}
												colspan={colSpan}
											/>
										}
									>
										<TableDevice
											colSpan={colSpan}
											isError={isError}
											devices={devices.data}
										/>
									</Suspense>
								)}
							</>
						</TableBody>
					</Table>
				</TablePageWrapper>
				{devices && !isLoading && !isError && (
					<PaginationBar
						registerOptions={DeviceComputerFilter.pageSizeOptions}
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
	},
	(prevProps, nextProps) => prevProps.query === nextProps.query
)

TableWrapper.displayName = 'TableWrapper'
