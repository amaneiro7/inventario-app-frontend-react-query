import { lazy, Suspense, useCallback } from 'react'
import { useDownloadExcelService } from '@/hooks/download/useDownloadExcelService'
import { useGetAllPrinterDevices } from '@/core/devices/devices/infra/hook/useGetAllPrinterDevices'
import { usePrinterFilter } from '@/hooks/filters/usePrinterFilters'
import { DevicePrinterFilter } from '@/core/devices/devices/application/printer/DevicePrinterFilter'
import { type DevicePrinterFilters } from '@/core/devices/devices/application/printer/CreateDevicePrinterParams'

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
const TablePrinter = lazy(() =>
	import('@/ui/List/printer/TablePrinter').then(m => ({ default: m.TablePrinter }))
)

const LoadingTable = lazy(async () =>
	import('@/components/Table/LoadingTable').then(m => ({
		default: m.LoadingTable
	}))
)

export default function ListMonitor() {
	const { setFilters, cleanFilters, setPageNumber, setPageSize, mainCategoryId, ...query } =
		usePrinterFilter()

	const handleChange = (name: string, value: string | number) => {
		const key = name as keyof DevicePrinterFilters
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
		source: 'printer'
	})

	const { devices, isLoading } = useGetAllPrinterDevices({
		...query
	})

	return (
		<>
			<ListWrapper
				title="Lista de impresoras"
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
					<TableDefaultDevice>
						{isLoading ? (
							<LoadingTable registerPerPage={query.pageSize} colspan={7} />
						) : (
							<Suspense>
								<TablePrinter devices={devices?.data} />
							</Suspense>
						)}
					</TableDefaultDevice>
				}
				currentPage={devices?.info.page}
				totalPages={devices?.info.totalPage}
				registerOptions={DevicePrinterFilter.pegaSizeOptions}
				pageSize={query.pageSize}
				handlePageClick={handlePageClick}
				handlePageSize={handlePageSize}
			/>
		</>
	)
}
