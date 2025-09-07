import { lazy, memo } from 'react'
import { useGetAllScreenDevices } from '@/entities/devices/devices/infra/hook/useGetAllScreenDevices'
import { DeviceScreenFilter } from '@/entities/devices/devices/application/screenFilter/DeviceScreenFilter'
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

interface TableScreenWrapperProps {
	query: DeviceBaseFilters
	handlePageSize: (pageSize: number) => void
	handlePageClick: ({ selected }: { selected: number }) => void
	handleSort: (field: string) => Promise<void>
	handleChange: (name: string, value: string | number) => void
}

export const TableScreenWrapper = memo(
	({
		query,
		handleSort,
		handleChange,
		handlePageSize,
		handlePageClick
	}: TableScreenWrapperProps) => {
		const { devices, isError, isLoading } = useGetAllScreenDevices(query)
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
				pageSizeOptions={DeviceScreenFilter.pageSizeOptions}
				defaultPageSize={DeviceScreenFilter.defaultPageSize}
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
TableScreenWrapper.displayName = 'TableScreenWrapper'
