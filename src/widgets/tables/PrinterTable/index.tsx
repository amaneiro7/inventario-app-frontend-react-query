import { lazy, memo, Suspense } from 'react'
import { useGetAllPrinterDevices } from '@/entities/devices/devices/infra/hook/useGetAllPrinterDevices'
import { DevicePrinterFilter } from '@/entities/devices/devices/application/printer/DevicePrinterFilter'
import { useDefaultDeviceHeader } from '@/entities/devices/devices/infra/hook/useDefaultDeviceHeader'
import { LoadingTable } from '@/shared/ui/Table/LoadingTable'
import { type DeviceBaseFilters } from '@/entities/devices/devices/application/createDeviceQueryParams'

const TableLayout = lazy(() =>
	import('@/shared/ui/layouts/TableLayout').then(m => ({ default: m.TableLayout }))
)
const TablePrinter = lazy(() =>
	import('@/entities/devices/devices/infra/ui/DeviceTable/TablePrinter').then(m => ({
		default: m.TablePrinter
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
		const { colSpan, headers, visibleColumns } = useDefaultDeviceHeader()
		return (
			<TableLayout
				colSpan={colSpan}
				handleChange={handleChange}
				handlePageClick={handlePageClick}
				handlePageSize={handlePageSize}
				handleSort={handleSort}
				orderBy={query?.orderBy}
				orderType={query?.orderType}
				dataIsLoaded={devices !== undefined}
				pageSizeOptions={DevicePrinterFilter.pageSizeOptions}
				defaultPageSize={DevicePrinterFilter.defaultPageSize}
				isError={isError}
				isLoading={isLoading}
				typeOfSiteId={query?.typeOfSiteId}
				page={devices?.info?.page}
				pageNumber={query?.pageNumber}
				totalPage={devices?.info?.totalPage}
				pageSize={query?.pageSize}
				total={devices?.info?.total}
				headers={headers}
			>
				<>
					{devices !== undefined && (
						<Suspense
							fallback={
								<LoadingTable registerPerPage={query.pageSize} colspan={colSpan} />
							}
						>
							<TablePrinter
								colSpan={colSpan}
								isError={isError}
								devices={devices.data}
								visibleColumns={visibleColumns}
							/>
						</Suspense>
					)}
				</>
			</TableLayout>
		)
	}
)

TablePrinterWrapper.displayName = 'TablePrinterWrapper'
