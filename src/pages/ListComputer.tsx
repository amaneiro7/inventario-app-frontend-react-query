import { lazy, Suspense, useCallback, useMemo } from 'react'
import { useComputerFilter } from '@/hooks/filters/useComputerFilters'
import { useGetAllComputerDevices } from '@/core/devices/devices/infra/hook/useGetAllComputerDevices'
import { useDownloadExcelService } from '@/hooks/download/useDownloadExcelService'
import { DeviceComputerFilter } from '@/core/devices/devices/application/computerFilter/DeviceComputerFilter'
import { Loading } from '@/components/Loading'
import { type DeviceComputerFilters } from '@/core/devices/devices/application/computerFilter/CreateDeviceComputerParams'

const ListWrapper = lazy(() =>
	import('@/ui/List/ListWrapper').then(m => ({ default: m.ListWrapper }))
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
	import('@/ui/List/computer/TableWrapper').then(m => ({ default: m.TableWrapper }))
)

const LoadingTable = lazy(async () =>
	import('@/components/Table/LoadingTable').then(m => ({
		default: m.LoadingTable
	}))
)

const TableDevice = lazy(async () =>
	import('@/ui/List/computer/TableDevice').then(m => ({
		default: m.TableDevice
	}))
)

export default function ListComputer() {
	const { setFilters, cleanFilters, setPageNumber, setPageSize, mainCategoryId, ...query } =
		useComputerFilter()

	const handleChange = useCallback(
		(name: string, value: string | number) => {
			const key = name as keyof DeviceComputerFilters
			setFilters({ [key]: value })
			setPageNumber(1)
		},
		[setFilters]
	)

	const handlePageSize = useCallback(
		(pageSize: number) => {
			setPageSize(pageSize)
			setPageNumber(1)
		},
		[setPageSize, setPageNumber]
	)

	const handlePageClick = useCallback(
		({ selected }: { selected: number }) => {
			setPageNumber(selected + 1)
		},
		[setPageNumber]
	)
	console.log('ListComputer', 'query', query)
	const { download, isDownloading } = useDownloadExcelService({
		query,
		source: 'computer'
	})

	const { devices, isLoading } = useGetAllComputerDevices({
		...query
	})

	const tableContent = useMemo(() => {
		return isLoading ? (
			<LoadingTable registerPerPage={query.pageSize} colspan={9} />
		) : (
			<Suspense>
				<TableDevice devices={devices?.data} />
			</Suspense>
		)
	}, [isLoading, devices?.data, query.pageSize])

	return (
		<Suspense fallback={<Loading />}>
			<ListWrapper
				title="Lista de equipos de computación"
				typeOfSiteId={query.typeOfSiteId}
				handleChange={handleChange}
				handleClear={cleanFilters}
				handleExportToExcel={download}
				isDownloading={isDownloading}
				url="/device/add"
				mainFilter={
					<Suspense>
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
					</Suspense>
				}
				otherFilter={
					<>
						<Suspense>
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
						</Suspense>
						<Suspense>
							<OtherComputerFilter
								handleChange={handleChange}
								ipAddress={query.ipAddress}
								computerName={query.computerName}
								operatingSystemId={query.operatingSystemId}
								operatingSystemArqId={query.operatingSystemArqId}
								processor={query.processor}
							/>
						</Suspense>
					</>
				}
				total={devices?.info.total}
				loading={isLoading}
				table={<DeviceTable>{tableContent}</DeviceTable>}
				currentPage={devices?.info.page}
				totalPages={devices?.info.totalPage}
				registerOptions={DeviceComputerFilter.pegaSizeOptions}
				pageSize={query.pageSize}
				handlePageClick={handlePageClick}
				handlePageSize={handlePageSize}
			/>
		</Suspense>
	)
}
