import { lazy, memo, Suspense } from 'react'
import { useGetAllComputerDevices } from '@/core/devices/devices/infra/hook/useGetAllComputerDevices'
import { useTableDeviceWrapper } from './useTableDeviceWrapper'
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

export const TableWrapper = memo(
	({ query, handleSort, handleChange, handlePageSize, handlePageClick }: TableWrapperProps) => {
		const { devices, isError, isLoading } = useGetAllComputerDevices(query)
		const { colSpan, headers, visibleColumns } = useTableDeviceWrapper()
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
											visibleColumns={visibleColumns}
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
	},
	(prevProps, nextProps) =>
		prevProps.query === nextProps.query &&
		prevProps.handleSort === nextProps.handleSort &&
		prevProps.handleChange === nextProps.handleChange &&
		prevProps.handlePageSize === nextProps.handlePageSize &&
		prevProps.handlePageClick === nextProps.handlePageClick
)
