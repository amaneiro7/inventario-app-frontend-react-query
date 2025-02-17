import { lazy, Suspense, useCallback } from 'react'
import { useDownloadExcelService } from '@/hooks/download/useDownloadExcelService'
import { useGetAllFinantialPrinterDevices } from '@/core/devices/devices/infra/hook/useGetAllFinantialPrinterDevices'
import { useFinantialPrinterFilter } from '@/hooks/filters/useFinantialPrinterFilters'
import { DeviceFinantialPrinterFilter } from '@/core/devices/devices/application/finantialPrinter/DeviceFinantialPrinterFilter'
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
const TableFinantialPrinter = lazy(() =>
	import('@/ui/List/finantialPrinter/TableFinantialPrinter').then(m => ({
		default: m.TableFinantialPrinter
	}))
)

const LoadingTable = lazy(async () =>
	import('@/components/Table/LoadingTable').then(m => ({
		default: m.LoadingTable
	}))
)

export default function ListFinantialPrinter() {
	const { setFilters, cleanFilters, setPageNumber, setPageSize, mainCategoryId, ...query } =
		useFinantialPrinterFilter()

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
		source: 'finantialPrinter'
	})

	const { devices, isLoading } = useGetAllFinantialPrinterDevices({
		...query
	})

	return (
		<>
			<ListWrapper
				title="Lista de impresoras financieras"
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
								<TableFinantialPrinter devices={devices?.data} />
							</Suspense>
						)}
					</TableDefaultDevice>
				}
				currentPage={devices?.info.page}
				totalPages={devices?.info.totalPage}
				registerOptions={DeviceFinantialPrinterFilter.pegaSizeOptions}
				pageSize={query.pageSize}
				handlePageClick={handlePageClick}
				handlePageSize={handlePageSize}
			/>
		</>
	)
}
