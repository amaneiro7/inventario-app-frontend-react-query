import { lazy, memo } from 'react'
import { useGetAllPartsDevices } from '@/entities/devices/devices/infra/hook/useGetAllPartsDevices'
import { DevicePartsFilter } from '@/entities/devices/devices/application/parts/DevicePartsFilter'
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
interface TablePartsWrapperProps {
	query: DeviceBaseFilters
	handlePageSize: (pageSize: number) => void
	handlePageClick: ({ selected }: { selected: number }) => void
	handleSort: (field: string) => Promise<void>
	handleChange: (name: string, value: string | number) => void
}

export const TablePartsWrapper = memo(
	({
		query,
		handleSort,
		handleChange,
		handlePageSize,
		handlePageClick
	}: TablePartsWrapperProps) => {
		const { devices, isError, isLoading } = useGetAllPartsDevices(query)
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
				pageSizeOptions={DevicePartsFilter.pageSizeOptions}
				defaultPageSize={DevicePartsFilter.defaultPageSize}
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
					{devices !== undefined && (
						<TableGenericDeviceCell
							handleViewDetails={handleViewDetails}
							devices={devices.data}
						/>
					)}
				</TableGenericDeviceBody>
			</TableLayout>
		)
	}
)

TablePartsWrapper.displayName = 'TablePartsWrapper'
