import { lazy, Suspense } from 'react'
import { useGetAllFinantialPrinterDevices } from '@/entities/devices/devices/infra/hook/useGetAllFinantialPrinterDevices'
import { useDefaulDeviceHeader } from '../useDefaulDeviceHeader'
import { DeviceFinantialPrinterFilter } from '@/entities/devices/devices/application/finantialPrinter/DeviceFinantialPrinterFilter'
import { TableDefaultDevice } from '../../../entities/devices/devices/infra/ui/TableDefaultDevice'
import { type DeviceFinantialPrinterFilters } from '@/entities/devices/devices/application/finantialPrinter/CreateDeviceFinantialPrinterParams'

interface TableFinantialWrapperProps {
	query: DeviceFinantialPrinterFilters
	handlePageSize: (pageSize: number) => void
	handlePageClick: ({ selected }: { selected: number }) => void
	handleSort: (field: string) => Promise<void>
	handleChange: (name: string, value: string | number) => void
}

const TableFinantialPrinter = lazy(() =>
	import('../../../entities/devices/devices/infra/ui/TableFinantialPrinter').then(m => ({
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
	const { colSpan, headers, visibleColumns } = useDefaulDeviceHeader()
	return (
		<TableDefaultDevice
			colSpan={colSpan}
			handleChange={handleChange}
			handlePageClick={handlePageClick}
			handlePageSize={handlePageSize}
			handleSort={handleSort}
			orderBy={query?.orderBy}
			orderType={query?.orderType}
			dataIsLoaded={devices !== undefined}
			pegaSizeOptions={DeviceFinantialPrinterFilter.pegaSizeOptions}
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
		</TableDefaultDevice>
	)
}
