import { lazy, Suspense } from 'react'
import { useGetAllPrinterDevices } from '@/entities/devices/devices/infra/hook/useGetAllPrinterDevices'
import { useDefaulDeviceHeader } from '@/entities/devices/devices/infra/hook/useDefaulDeviceHeader'
import { TableLayout } from '@/shared/ui/layouts/TableLayout'
import { DevicePrinterFilter } from '@/entities/devices/devices/application/printer/DevicePrinterFilter'
import { type DevicePrinterFilters } from '@/entities/devices/devices/application/printer/CreateDevicePrinterParams'

interface TablePrinterWrapperProps {
	query: DevicePrinterFilters
	handlePageSize: (pageSize: number) => void
	handlePageClick: ({ selected }: { selected: number }) => void
	handleSort: (field: string) => Promise<void>
	handleChange: (name: string, value: string | number) => void
}

const TablePrinter = lazy(() =>
	import('@/entities/devices/devices/infra/ui/DeviceTable/TablePrinter').then(m => ({
		default: m.TablePrinter
	}))
)

export function TablePrinterWrapper({
	query,
	handleSort,
	handleChange,
	handlePageSize,
	handlePageClick
}: TablePrinterWrapperProps) {
	const { devices, isError, isLoading } = useGetAllPrinterDevices(query)
	const { colSpan, headers, visibleColumns } = useDefaulDeviceHeader()
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
			pegaSizeOptions={DevicePrinterFilter.pegaSizeOptions}
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
					<Suspense>
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
