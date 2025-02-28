import { Suspense, useCallback, useMemo } from 'react'
import { useComputerFilter } from '@/hooks/filters/useComputerFilters'
import { useGetAllComputerDevices } from '@/core/devices/devices/infra/hook/useGetAllComputerDevices'
import { useDownloadExcelService } from '@/hooks/download/useDownloadExcelService'
import { DeviceComputerFilter } from '@/core/devices/devices/application/computerFilter/DeviceComputerFilter'
import { type DeviceComputerFilters } from '@/core/devices/devices/application/computerFilter/CreateDeviceComputerParams'
//components
import { ListWrapper } from '@/ui/List/ListWrapper'
import { MainComputerFilter } from '@/ui/List/MainComputerFilter'
import { TableWrapper } from '@/ui/List/computer/TableWrapper'
import { DefaultDeviceFilter } from '@/ui/List/DefaultDeviceFilter'
import { OtherComputerFilter } from '@/ui/List/FilterAside/OtherComputerFilter'
import { LoadingTable } from '@/components/Table/LoadingTable'
import { TableDevice } from '@/ui/List/computer/TableDevice'
import { Loading } from '@/components/Loading'

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

	const { download, isDownloading } = useDownloadExcelService()

	const { devices, isLoading } = useGetAllComputerDevices({
		...query
	})

	const tableContent = useMemo(() => {
		return isLoading ? (
			<LoadingTable registerPerPage={query.pageSize} colspan={9} />
		) : (
			<TableDevice devices={devices?.data} />
		)
	}, [isLoading, devices?.data, query.pageSize])

	return (
		<Suspense fallback={<Loading />}>
			<ListWrapper
				title="Lista de equipos de computación"
				typeOfSiteId={query.typeOfSiteId}
				handleChange={handleChange}
				handleClear={cleanFilters}
				handleExportToExcel={() => download({ query, source: 'computer' })}
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
				table={<TableWrapper>{tableContent}</TableWrapper>}
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
