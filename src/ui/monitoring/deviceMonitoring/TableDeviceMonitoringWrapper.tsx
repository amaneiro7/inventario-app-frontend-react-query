import { lazy, memo, Suspense } from 'react'
import { eventManager } from '@/shared/lib/utils/eventManager'
import { useTableDeviceMonitoringWrapper } from './useTableDeviceMonitoringWrapper'
import { DeviceComputerFilter } from '@/entities/devices/devices/application/computerFilter/DeviceComputerFilter'
import { Table } from '@/shared/ui/Table/Table'
import { TableBody } from '@/shared/ui/Table/TableBody'
import { TableHead } from '@/shared/ui/Table/TableHead'
import { TableHeader } from '@/shared/ui/Table/TableHeader'
import { TablePageWrapper } from '@/shared/ui/Table/TablePageWrapper'
import { TableRow } from '@/shared/ui/Table/TableRow'
import { TabsNav } from '../../../shared/ui/Tab/TabsNav'
import { TypeOfSiteTabNav } from '../../../entities/locations/typeOfSites/infra/ui/TypeOfSiteTabNav'
import { LoadingTable } from '@/shared/ui/Table/LoadingTable'
import { PaginationBar } from '../../../shared/ui/Pagination/PaginationBar'
import { type DeviceMonitoringFilters } from '@/entities/devices/deviceMonitoring/application/createDeviceMonitoringQueryParams'
import { type Response } from '@/entities/shared/domain/methods/Response'
import { type DeviceMonitoring } from '@/entities/devices/deviceMonitoring/domain/dto/DeviceMonitoring.dto'

interface TableDeviceMonitoringWrapperProps {
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
	import('@/ui/monitoring/deviceMonitoring/TableDeviceMonitoring').then(m => ({
		default: m.TableDeviceMonitoring
	}))
)

export const TableDeviceMonitoringWrapper = memo(
	({
		query,
		deviceMonitorings,
		isError,
		isLoading,
		handleSort,
		handleChange,
		handlePageSize,
		handlePageClick
	}: TableDeviceMonitoringWrapperProps) => {
		const { colSpan, headers, visibleColumns } = useTableDeviceMonitoringWrapper()
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
										openIcon={false}
									/>
								)}
								{deviceMonitorings !== undefined && (
									<Suspense
										fallback={
											<LoadingTable
												registerPerPage={query?.pageSize}
												colspan={colSpan}
												openIcon={false}
											/>
										}
									>
										<TableDeviceMonitoring
											colSpan={colSpan}
											isError={isError}
											devices={deviceMonitorings.data}
											visibleColumns={visibleColumns}
										/>
									</Suspense>
								)}
							</>
						</TableBody>
					</Table>
				</TablePageWrapper>
				{deviceMonitorings && !isLoading && !isError && (
					<PaginationBar
						registerOptions={DeviceComputerFilter.pegaSizeOptions}
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
