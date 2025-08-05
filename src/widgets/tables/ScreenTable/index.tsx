import { lazy, Suspense } from 'react'
import { useGetAllScreenDevices } from '@/entities/devices/devices/infra/hook/useGetAllScreenDevices'
import { TableLayout } from '@/shared/ui/layouts/TableLayout'
import { useDefaulDeviceHeader } from '@/entities/devices/devices/infra/hook/useDefaulDeviceHeader'
import { DeviceScreenFilter } from '@/entities/devices/devices/application/screenFilter/DeviceScreenFilter'
import { type DeviceScreenFilters } from '@/entities/devices/devices/application/screenFilter/CreateDeviceScreenParams'
interface TableScreenWrapperProps {
	query: DeviceScreenFilters
	handlePageSize: (pageSize: number) => void
	handlePageClick: ({ selected }: { selected: number }) => void
	handleSort: (field: string) => Promise<void>
	handleChange: (name: string, value: string | number) => void
}

const TableScreen = lazy(() =>
	import('@/entities/devices/devices/infra/ui/DeviceTable/TableScreen').then(m => ({
		default: m.TableScreen
	}))
)

export function TableScreenWrapper({
	query,
	handleSort,
	handleChange,
	handlePageSize,
	handlePageClick
}: TableScreenWrapperProps) {
	const { devices, isError, isLoading } = useGetAllScreenDevices(query)
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
			pegaSizeOptions={DeviceScreenFilter.pegaSizeOptions}
			defaultPageSize={DeviceScreenFilter.defaultPageSize}
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
						<TableScreen
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
