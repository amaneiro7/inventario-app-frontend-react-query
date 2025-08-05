import { lazy, Suspense } from 'react'
import { useGetAllFinantialPrinterDevices } from '@/entities/devices/devices/infra/hook/useGetAllFinantialPrinterDevices'
import { useDefaultDeviceHeader } from '@/entities/devices/devices/infra/hook/useDefaultDeviceHeader'
import { DeviceFinantialPrinterFilter } from '@/entities/devices/devices/application/finantialPrinter/DeviceFinantialPrinterFilter'
import { TableLayout } from '@/shared/ui/layouts/TableLayout'
import { type DeviceBaseFilters } from '@/entities/devices/devices/application/createDeviceQueryParams'

interface TableFinantialWrapperProps {
	query: DeviceBaseFilters
	handlePageSize: (pageSize: number) => void
	handlePageClick: ({ selected }: { selected: number }) => void
	handleSort: (field: string) => Promise<void>
	handleChange: (name: string, value: string | number) => void
}

const TableFinantialPrinter = lazy(() =>
	import('@/entities/devices/devices/infra/ui/DeviceTable/TableFinantialPrinter').then(m => ({
		default: m.TableFinantialPrinter
	}))
)

export function TableFinantialWrapper({
	query,
	handleSort,
	handleChange,
	handlePageSize,
	handlePageClick
}: TableFinantialWrapperProps) {
	const { devices, isError, isLoading } = useGetAllFinantialPrinterDevices(query)
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
			pageSizeOptions={DeviceFinantialPrinterFilter.pageSizeOptions}
			defaultPageSize={DeviceFinantialPrinterFilter.defaultPageSize}
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
						<TableFinantialPrinter
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
