import { Table } from '@/components/Table/Table'
import { TableBody } from '@/components/Table/TableBody'
import { TableHead } from '@/components/Table/TableHead'
import { TableHeader } from '@/components/Table/TableHeader'
import { TablePageWrapper } from '@/components/Table/TablePageWrapper'
import { TableRow } from '@/components/Table/TableRow'
import { type DeviceComputerFilters } from '@/core/devices/devices/application/computerFilter/CreateDeviceComputerParams'
import { DeviceComputerFilter } from '@/core/devices/devices/application/computerFilter/DeviceComputerFilter'
import { useGetAllComputerDevices } from '@/core/devices/devices/infra/hook/useGetAllComputerDevices'
import { TabsNav } from '../Tab/TabsNav'
import { TypeOfSiteTabNav } from '../Tab/TypeOfSiteTabNav'
import { lazy, Suspense } from 'react'
import { LoadingTable } from '@/components/Table/LoadingTable'
import { PaginationBar } from '../Pagination/PaginationBar'
import { eventManager } from '@/utils/eventManager'

interface TableWrapperProps {
	query: DeviceComputerFilters
	handlePageSize: (pageSize: number) => void
	handlePageClick: ({ selected }: { selected: number }) => void
	handleSort: (field: string) => Promise<void>
	handleChange: (name: string, value: string | number) => void
}

const TableDevice = lazy(() =>
	import('@/ui/List/computer/TableDevice').then(m => ({ default: m.TableDevice }))
)

export function TableWrapper({
	query,
	handleSort,
	handleChange,
	handlePageSize,
	handlePageClick
}: TableWrapperProps) {
	const { devices, isError, isLoading } = useGetAllComputerDevices(query)
	const colSpan = 9
	return (
		<>
			<TablePageWrapper>
				<TabsNav
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
								handleSort={eventManager(handleSort)}
								orderBy={query.orderBy}
								orderType={query.orderType}
								orderByField="employeeId"
								size="small"
								name="Usuario"
							/>
							<TableHead
								handleSort={eventManager(handleSort)}
								orderBy={query.orderBy}
								orderType={query.orderType}
								orderByField="locationId"
								size="large"
								name="Ubicación"
							/>
							<TableHead
								handleSort={eventManager(handleSort)}
								orderBy={query.orderBy}
								orderType={query.orderType}
								orderByField="ipAddress"
								size="small"
								name="Dirección IP"
							/>
							<TableHead
								handleSort={eventManager(handleSort)}
								orderBy={query.orderBy}
								orderType={query.orderType}
								orderByField="serial"
								size="small"
								name="Serial"
							/>
							<TableHead
								handleSort={eventManager(handleSort)}
								orderBy={query.orderBy}
								orderType={query.orderType}
								orderByField="categoryId"
								size="small"
								name="Categoria"
							/>
							<TableHead
								handleSort={eventManager(handleSort)}
								orderBy={query.orderBy}
								orderType={query.orderType}
								orderByField="brandId"
								size="small"
								name="Marca"
							/>
							<TableHead
								handleSort={eventManager(handleSort)}
								orderBy={query.orderBy}
								orderType={query.orderType}
								orderByField="modelId"
								size="xLarge"
								name="Modelo"
							/>
							<TableHead
								handleSort={eventManager(handleSort)}
								orderBy={query.orderBy}
								orderType={query.orderType}
								orderByField="computerName"
								size="small"
								name="Nombre de Equipo"
							/>
							<TableHead
								handleSort={eventManager(handleSort)}
								orderBy={query.orderBy}
								orderType={query.orderType}
								orderByField="observation"
								size="small"
								name="Observaciones"
							/>
							<TableHead size="xxSmall" name="" />
						</TableRow>
					</TableHeader>
					<TableBody>
						<>
							{isLoading && (
								<LoadingTable registerPerPage={query?.pageSize} colspan={colSpan} />
							)}
							{devices !== undefined && (
								<Suspense>
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
					registerOptions={DeviceComputerFilter.pegaSizeOptions}
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
