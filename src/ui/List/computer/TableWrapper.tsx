import { lazy, Suspense } from 'react'
import { useGetAllComputerDevices } from '@/core/devices/devices/infra/hook/useGetAllComputerDevices'
import { eventManager } from '@/utils/eventManager'

import { DeviceComputerFilter } from '@/core/devices/devices/application/computerFilter/DeviceComputerFilter'
import { Table } from '@/components/Table/Table'
import { TableBody } from '@/components/Table/TableBody'
import { TableHead } from '@/components/Table/TableHead'
import { TableHeader } from '@/components/Table/TableHeader'
import { TablePageWrapper } from '@/components/Table/TablePageWrapper'
import { TableRow } from '@/components/Table/TableRow'
import { TabsNav } from '../Tab/TabsNav'
import { TypeOfSiteTabNav } from '../Tab/TypeOfSiteTabNav'
import { LoadingTable } from '@/components/Table/LoadingTable'
import { PaginationBar } from '../Pagination/PaginationBar'

import { type DeviceComputerFilters } from '@/core/devices/devices/application/computerFilter/CreateDeviceComputerParams'

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
								isTab
								aria-colindex={1}
								handleSort={eventManager(handleSort)}
								orderBy={query.orderBy}
								orderType={query.orderType}
								orderByField="employeeId"
								size="small"
								name="Usuario"
							/>
							<TableHead
								isTab
								aria-colindex={2}
								handleSort={eventManager(handleSort)}
								orderBy={query.orderBy}
								orderType={query.orderType}
								orderByField="locationId"
								size="large"
								name="Ubicación"
							/>
							<TableHead
								isTab
								aria-colindex={3}
								handleSort={eventManager(handleSort)}
								orderBy={query.orderBy}
								orderType={query.orderType}
								orderByField="ipAddress"
								size="small"
								name="Dirección IP"
							/>
							<TableHead
								isTab
								aria-colindex={4}
								handleSort={eventManager(handleSort)}
								orderBy={query.orderBy}
								orderType={query.orderType}
								orderByField="serial"
								size="small"
								name="Serial"
							/>
							<TableHead
								isTab
								aria-colindex={5}
								handleSort={eventManager(handleSort)}
								orderBy={query.orderBy}
								orderType={query.orderType}
								orderByField="categoryId"
								size="small"
								name="Categoria"
							/>
							<TableHead
								isTab
								aria-colindex={6}
								handleSort={eventManager(handleSort)}
								orderBy={query.orderBy}
								orderType={query.orderType}
								orderByField="brandId"
								size="small"
								name="Marca"
							/>
							<TableHead
								isTab
								aria-colindex={7}
								handleSort={eventManager(handleSort)}
								orderBy={query.orderBy}
								orderType={query.orderType}
								orderByField="modelId"
								size="xLarge"
								name="Modelo"
							/>
							<TableHead
								isTab
								aria-colindex={8}
								handleSort={eventManager(handleSort)}
								orderBy={query.orderBy}
								orderType={query.orderType}
								orderByField="computerName"
								size="small"
								name="Nombre de Equipo"
							/>
							<TableHead
								isTab
								aria-colindex={9}
								handleSort={eventManager(handleSort)}
								orderBy={query.orderBy}
								orderType={query.orderType}
								orderByField="observation"
								size="small"
								name="Observaciones"
							/>
							<TableHead aria-colindex={10} size="xxSmall" name="" />
						</TableRow>
					</TableHeader>
					<TableBody>
						<>
							{isLoading && (
								<LoadingTable registerPerPage={query?.pageSize} colspan={colSpan} />
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
