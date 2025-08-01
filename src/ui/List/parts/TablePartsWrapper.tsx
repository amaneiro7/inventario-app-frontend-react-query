import { lazy } from 'react'
import { useGetAllPartsDevices } from '@/entities/devices/devices/infra/hook/useGetAllPartsDevices'
import { useDefaulDeviceHeader } from '../useDefaulDeviceHeader'
import { TableDefaultDevice } from '../TableDefaultDevice'
import { DevicePartsFilter } from '@/entities/devices/devices/application/parts/DevicePartsFilter'
import { type DevicePartsFilters } from '@/entities/devices/devices/application/parts/CreateDevicePartsParams'

interface TablePartsWrapperProps {
	query: DevicePartsFilters
	handlePageSize: (pageSize: number) => void
	handlePageClick: ({ selected }: { selected: number }) => void
	handleSort: (field: string) => Promise<void>
	handleChange: (name: string, value: string | number) => void
}

const TableParts = lazy(() => import('./TableParts').then(m => ({ default: m.TableParts })))

export function TablePartsWrapper({
	query,
	handleSort,
	handleChange,
	handlePageSize,
	handlePageClick
}: TablePartsWrapperProps) {
	const { devices, isError, isLoading } = useGetAllPartsDevices(query)
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
			pegaSizeOptions={DevicePartsFilter.pegaSizeOptions}
			defaultPageSize={DevicePartsFilter.defaultPageSize}
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
					<TableParts
						colSpan={colSpan}
						isError={isError}
						devices={devices.data}
						visibleColumns={visibleColumns}
					/>
				)}
			</>
		</TableDefaultDevice>
	)
}
