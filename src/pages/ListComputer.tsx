import { lazy, Suspense, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useComputerFilter } from '@/core/devices/devices/infra/hook/useComputerFilters'
import { useDownloadExcelService } from '@/hooks/useDownloadExcelService'
//components
import { DetailsBoxWrapper } from '@/components/DetailsWrapper/DetailsBoxWrapper'
import { InputFallback } from '@/components/Loading/InputFallback'
import { FilterSection } from '@/ui/List/FilterSection'
import { FilterAside, type FilterAsideRef } from '@/ui/List/FilterAside/FilterAside'
import { TableWrapper } from '@/ui/List/computer/TableWrapper'
import { ButtonSection } from '@/ui/List/ButttonSection/ButtonSection'
import { Loading } from '@/components/Loading'
const DefaultDeviceFilter = lazy(() =>
	import('@/ui/List/DefaultDeviceFilter').then(m => ({ default: m.DefaultDeviceFilter }))
)
const OtherComputerFilter = lazy(() =>
	import('@/ui/List/FilterAside/OtherComputerFilter').then(m => ({
		default: m.OtherComputerFilter
	}))
)
const ComputerOrderByCombobox = lazy(() =>
	import('@/components/ComboBox/Sincrono/ComputerOrderByComboBox').then(m => ({
		default: m.ComputerOrderByCombobox
	}))
)

const MainComputerFilter = lazy(() =>
	import('@/ui/List/MainComputerFilter').then(m => ({ default: m.MainComputerFilter }))
)

export default function ListComputer() {
	const filterAsideRef = useRef<FilterAsideRef>(null)
	const navigate = useNavigate()
	const {
		cleanFilters,
		handlePageSize,
		handlePageClick,
		handleSort,
		handleChange,
		mainCategoryId,
		...query
	} = useComputerFilter()

	const { download, isDownloading } = useDownloadExcelService()

	const handleDownloadToExcel = async () => {
		await download({ source: 'computer', query })
	}

	return (
		<Suspense fallback={<Loading />}>
			<DetailsBoxWrapper>
				<FilterSection>
					<MainComputerFilter
						categoryId={query.categoryId}
						employeeId={query.employeeId}
						serial={query.serial}
						locationId={query.locationId}
						regionId={query.regionId}
						mainCategoryId={mainCategoryId}
						typeOfSiteId={query.typeOfSiteId}
						departamentoId={query.departamentoId}
						handleChange={handleChange}
					/>

					<FilterAside ref={filterAsideRef}>
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
					</FilterAside>
				</FilterSection>
				<ButtonSection
					handleExportToExcel={handleDownloadToExcel}
					loading={isDownloading}
					filterButton
					handleClear={cleanFilters}
					handleAdd={() => {
						navigate('/device/add')
					}}
					handleFilter={filterAsideRef.current?.handleOpen}
				>
					<Suspense fallback={<InputFallback />}>
						<ComputerOrderByCombobox
							handleSort={handleSort}
							orderBy={query.orderBy}
							orderType={query.orderType}
							name="orderBy"
						/>
					</Suspense>
				</ButtonSection>
			</DetailsBoxWrapper>
			<TableWrapper
				handlePageSize={handlePageSize}
				handlePageClick={handlePageClick}
				handleChange={handleChange}
				handleSort={handleSort}
				query={query}
			/>
		</Suspense>
	)
}
