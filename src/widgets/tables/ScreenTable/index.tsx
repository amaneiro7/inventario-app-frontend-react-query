import { lazy, memo, Suspense } from 'react'
import { useGetAllScreenDevices } from '@/entities/devices/devices/infra/hook/useGetAllScreenDevices'
import { useDefaultDeviceHeader } from '@/entities/devices/devices/infra/hook/useDefaultDeviceHeader'
import { DeviceScreenFilter } from '@/entities/devices/devices/application/screenFilter/DeviceScreenFilter'
import { LoadingTable } from '@/shared/ui/Table/LoadingTable'
import { type DeviceBaseFilters } from '@/entities/devices/devices/application/createDeviceQueryParams'

const TableLayout = lazy(() =>
	import('@/shared/ui/layouts/TableLayout').then(m => ({ default: m.TableLayout }))
)

const TableScreen = lazy(() =>
	import('@/entities/devices/devices/infra/ui/DeviceTable/TableScreen').then(m => ({
		default: m.TableScreen
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
				headers={headers}
			>
				<>
					{devices !== undefined && (
						<Suspense
							fallback={
								<LoadingTable registerPerPage={query.pageSize} colspan={colSpan} />
							}
						>
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
)
TableScreenWrapper.displayName = 'TableScreenWrapper'
