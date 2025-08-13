import { lazy, memo, Suspense } from 'react'
import { useGetAllPartsDevices } from '@/entities/devices/devices/infra/hook/useGetAllPartsDevices'
import { useDefaultDeviceHeader } from '@/entities/devices/devices/infra/hook/useDefaultDeviceHeader'
import { DevicePartsFilter } from '@/entities/devices/devices/application/parts/DevicePartsFilter'
import { LoadingTable } from '@/shared/ui/Table/LoadingTable'
import { type DeviceBaseFilters } from '@/entities/devices/devices/application/createDeviceQueryParams'

const TableLayout = lazy(() =>
	import('@/shared/ui/layouts/TableLayout').then(m => ({ default: m.TableLayout }))
)
const TableParts = lazy(() =>
	import('@/entities/devices/devices/infra/ui/DeviceTable/TableParts').then(m => ({
		default: m.TableParts
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
				headers={headers}
			>
				<>
					{devices !== undefined && (
						<Suspense
							fallback={
								<LoadingTable registerPerPage={query.pageSize} colspan={colSpan} />
							}
						>
							<TableParts
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

TablePartsWrapper.displayName = 'TablePartsWrapper'
