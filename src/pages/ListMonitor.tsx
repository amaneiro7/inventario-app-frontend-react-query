import { lazy, Suspense, useCallback } from 'react'
import { useDownloadExcelService } from '@/hooks/download/useDownloadExcelService'
import { Loading } from '@/components/Loading'
import { useScreenFilter } from '@/hooks/filters/useScreenFilters'
import { DeviceScreenFilter } from '@/core/devices/devices/application/screenFilter/DeviceScreenFilter'
import { useGetAllScreenDevices } from '@/core/devices/devices/infra/hook/useGetAllScreenDevices'
import { type DeviceScreenFilters } from '@/core/devices/devices/application/screenFilter/CreateDeviceScreenParams'

const ListWrapper = lazy(
	async () => await import('@/ui/List/ListWrapper').then(m => ({ default: m.ListWrapper }))
)
const MainComputerFilter = lazy(
	async () =>
		await import('@/ui/List/MainComputerFilter').then(m => ({ default: m.MainComputerFilter }))
)
const DefaultDeviceFilter = lazy(
	async () =>
		await import('@/ui/List/DefaultDeviceFilter').then(m => ({
			default: m.DefaultDeviceFilter
		}))
)
const TableDefaultDevice = lazy(() =>
	import('@/ui/List/TableDefaultDevice').then(m => ({ default: m.TableDefaultDevice }))
)
const TableMonitor = lazy(() =>
	import('@/ui/List/screen/TableMonitor').then(m => ({ default: m.TableMonitor }))
)

const LoadingTable = lazy(async () =>
	import('@/components/Table/LoadingTable').then(m => ({
		default: m.LoadingTable
	}))
)

export default function ListMonitor() {
	const { setFilters, cleanFilters, setPageNumber, setPageSize, mainCategoryId, ...query } =
		useScreenFilter()

	const handleChange = (name: string, value: string | number) => {
		const key = name as keyof DeviceScreenFilters
		setFilters({ [key]: value })
		setPageNumber(1)
	}

	const handlePageSize = useCallback((pageSize: number) => {
		setPageSize(pageSize)
		setPageNumber(1)
	}, [])

	const handlePageClick = useCallback(({ selected }: { selected: number }) => {
		setPageNumber(selected + 1)
	}, [])

	const { download, isDownloading } = useDownloadExcelService({
		query: query,
		source: 'monitor'
	})

	const { devices, isLoading } = useGetAllScreenDevices({
		...query
	})

	return (
		<Suspense fallback={<Loading />}>
			<ListWrapper
				title="Lista de pantallas"
				typeOfSiteId={query.typeOfSiteId}
				handleChange={handleChange}
				handleClear={cleanFilters}
				handleExportToExcel={download}
				isDownloading={isDownloading}
				url="/device/add"
				mainFilter={
					<MainComputerFilter
						categoryId={query.categoryId}
						employeeId={query.employeeId}
						serial={query.serial}
						locationId={query.locationId}
						regionId={query.regionId}
						mainCategoryId={mainCategoryId}
						typeOfSiteId={query.typeOfSiteId}
						handleChange={handleChange}
					/>
				}
				otherFilter={
					<>
						<DefaultDeviceFilter
							activo={query.activo}
							statusId={query.statusId}
							brandId={query.brandId}
							modelId={query.modelId}
							categoryId={query.categoryId}
							stateId={query.stateId}
							regionId={query.regionId}
							cityId={query.cityId}
							handleChange={handleChange}
						/>
					</>
				}
				total={devices?.info.total}
				loading={isLoading}
				table={
					<Suspense>
						<TableDefaultDevice>
							{isLoading ? (
								<LoadingTable registerPerPage={query.pageSize} colspan={7} />
							) : (
								<Suspense>
									<TableMonitor devices={devices?.data} />
								</Suspense>
							)}
						</TableDefaultDevice>
					</Suspense>
				}
				currentPage={devices?.info.page}
				totalPages={devices?.info.totalPage}
				registerOptions={DeviceScreenFilter.pegaSizeOptions}
				pageSize={query.pageSize}
				handlePageClick={handlePageClick}
				handlePageSize={handlePageSize}
			/>
		</Suspense>
	)
}
