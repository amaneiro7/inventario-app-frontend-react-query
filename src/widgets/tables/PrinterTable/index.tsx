import { lazy, memo } from 'react'
import { useGetAllPrinterDevices } from '@/entities/devices/devices/infra/hook/useGetAllPrinterDevices'
import { DevicePrinterFilter } from '@/entities/devices/devices/application/printer/DevicePrinterFilter'
import { useTableGenericDeviceBody } from '@/entities/devices/devices/infra/ui/DeviceTable/useTableGenericDeviceBody'
import { type DeviceBaseFilters } from '@/entities/devices/devices/application/createDeviceQueryParams'
import { type DeviceDto } from '@/entities/devices/devices/domain/dto/Device.dto'

const TableLayout = lazy(() =>
	import('@/shared/ui/layouts/TableLayout').then(m => ({ default: m.TableLayout }))
)
const TableGenericDeviceBody = lazy(() =>
	import('@/entities/devices/devices/infra/ui/DeviceTable/TableGenericDeviceBody').then(m => ({
		default: m.TableGenericDeviceBody
	}))
)

const TableGenericDeviceCell = lazy(() =>
	import('@/entities/devices/devices/infra/ui/DeviceTable/TableGenericDeviceCell').then(m => ({
		default: m.TableGenericDeviceCell
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
		const { dialogRef, handleCloseModal, handleViewDetails, selectedDevice } =
			useTableGenericDeviceBody<DeviceDto>()
		return (
			<TableLayout
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
			>
				<TableGenericDeviceBody
					dialogRef={dialogRef}
					handleCloseModal={handleCloseModal}
					selectedDevice={selectedDevice}
					isError={isError}
					devices={devices?.data}
				>
					<TableGenericDeviceCell
						handleViewDetails={handleViewDetails}
						devices={devices?.data}
					/>
				</TableGenericDeviceBody>
			</TableLayout>
		)
	}
)

TablePrinterWrapper.displayName = 'TablePrinterWrapper'
