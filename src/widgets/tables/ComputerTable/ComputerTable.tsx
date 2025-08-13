import { lazy, memo, Suspense } from 'react'
import { useGetAllComputerDevices } from '@/entities/devices/devices/infra/hook/useGetAllComputerDevices'
import { useTableDeviceWrapper } from './useTableDeviceWrapper'
import { eventManager } from '@/shared/lib/utils/eventManager'
import { DeviceComputerFilter } from '@/entities/devices/devices/application/computerFilter/DeviceComputerFilter'
import { LoadingTable } from '@/shared/ui/Table/LoadingTable'
import { type DeviceBaseFilters } from '@/entities/devices/devices/application/createDeviceQueryParams'

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
	(prevProps, nextProps) =>
		prevProps.query === nextProps.query &&
		prevProps.handleSort === nextProps.handleSort &&
		prevProps.handleChange === nextProps.handleChange &&
		prevProps.handlePageSize === nextProps.handlePageSize &&
		prevProps.handlePageClick === nextProps.handlePageClick
)
