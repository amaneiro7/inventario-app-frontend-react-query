import { lazy } from 'react'
import { DeviceComputerFilter } from '@/core/devices/devices/application/DeviceComputerFilter'
import { useComputerFilter } from '@/hooks/filters/useComputerFilters'
import { useGetAllDevicess } from '@/hooks/getAll/useGetAllDevices'
import { type DeviceComputerFilters } from '@/core/devices/devices/application/CreateDeviceComputerParams'
import { useDownloadExcelService } from '@/hooks/download/useDownloadExcelService'
import { MainCategoryOptions } from '@/core/mainCategory/domain/entity/MainCategoryOptions'

const ListWrapper = lazy(
	async () => await import('@/ui/List/ListWrapper').then(m => ({ default: m.ListWrapper }))
)
const MainComputerFilter = lazy(
	async () =>
		await import('@/ui/List/MainComputerFilter').then(m => ({ default: m.MainComputerFilter }))
)
const OtherComputerFilter = lazy(
	async () =>
		await import('@/ui/List/FilterAside/OtherComputerFilter').then(m => ({
			default: m.OtherComputerFilter
		}))
)
const DefaultDeviceFilter = lazy(
	async () =>
		await import('@/ui/List/DefaultDeviceFilter').then(m => ({
			default: m.DefaultDeviceFilter
		}))
)
const DeviceTable = lazy(() =>
	import('@/ui/List/TableDevice').then(m => ({ default: m.TableWrapper }))
)

export default function ListComputer() {
	const { setFilters, cleanFilters, setPageNumber, setPageSize, mainCategoryId, ...query } =
		useComputerFilter()

	const handleChange = (name: string, value: string) => {
		const key = name as keyof DeviceComputerFilters
		setFilters({ [key]: value })
		setPageNumber(1)
	}

	const handlePageSize = (pageSize: number) => {
		setPageSize(pageSize)
		setPageNumber(1)
	}

	const handlePageClick = ({ selected }: { selected: number }) => {
		setPageNumber(selected + 1)
	}

	const { download, isDownloading } = useDownloadExcelService({
		query: {
			options: {
				mainCategoryId: MainCategoryOptions.COMPUTER,
				...query
			}
		},
		source: 'computer'
	})

	const { devices, isLoading } = useGetAllDevicess({
		options: {
			mainCategoryId: MainCategoryOptions.COMPUTER,
			...query
		},
		pageSize: query.pageSize ?? DeviceComputerFilter.defaultPageSize,
		pageNumber: query.pageNumber
	})

	return (
		<ListWrapper
			title="Lista de equipos de computación"
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
					mainCategoryId={query.mainCategoryId}
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
					<OtherComputerFilter
						handleChange={handleChange}
						ipAddress={query.ipAddress}
						computerName={query.computerName}
						operatingSystemId={query.operatingSystemId}
						operatingSystemArqId={query.operatingSystemArqId}
						processor={query.processor}
					/>
				</>
			}
			total={devices?.info.total}
			loading={isLoading}
			table={<DeviceTable devices={devices?.data} loading={isLoading} />}
			currentPage={devices?.info.page}
			totalPages={devices?.info.totalPage}
			registerOptions={DeviceComputerFilter.pegaSizeOptions}
			pageSize={query.pageSize}
			handlePageClick={handlePageClick}
			handlePageSize={handlePageSize}
		/>
	)
}
