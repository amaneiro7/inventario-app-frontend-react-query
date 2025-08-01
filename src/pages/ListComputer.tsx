import { lazy, Suspense, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useComputerFilter } from '@/entities/devices/devices/infra/hook/useComputerFilters'
import { useDownloadExcelService } from '@/shared/lib/hooks/useDownloadExcelService'
//components
import { DetailsBoxWrapper } from '@/shared/ui/DetailsWrapper/DetailsBoxWrapper'
import { InputFallback } from '@/shared/ui/Loading/InputFallback'
import { FilterSection } from '@/ui/List/FilterSection'
import { FilterAside, type FilterAsideRef } from '@/ui/List/FilterAside/FilterAside'
import { TableWrapper } from '@/ui/List/computer/TableWrapper'
import { ButtonSection } from '@/ui/List/ButttonSection/ButtonSection'

const DefaultDeviceFilter = lazy(() =>
	import('@/ui/List/DefaultDeviceFilter').then(m => ({ default: m.DefaultDeviceFilter }))
)
const OtherComputerFilter = lazy(() =>
	import('@/ui/List/FilterAside/OtherComputerFilter').then(m => ({
		default: m.OtherComputerFilter
	}))
)
const ComputerOrderByCombobox = lazy(() =>
	import('@/entities/devices/devices/infra/ui/ComputerOrderByComboBox').then(m => ({
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
		<>
			<DetailsBoxWrapper>
				<FilterSection>
					<MainComputerFilter
						categoryId={query.categoryId}
						employeeId={query.employeeId}
						serial={query.serial}
						locationId={query.locationId}
						regionId={query.regionId}
						administrativeRegionId={query.administrativeRegionId}
						mainCategoryId={mainCategoryId}
						typeOfSiteId={query.typeOfSiteId}
						directivaId={query.directivaId}
						vicepresidenciaEjecutivaId={query.vicepresidenciaEjecutivaId}
						vicepresidenciaId={query.vicepresidenciaId}
						departamentoId={query.departamentoId}
						handleChange={handleChange}
					/>

					<FilterAside ref={filterAsideRef}>
						<Suspense>
							<DefaultDeviceFilter
								activo={query.activo}
								statusId={query.statusId}
								brandId={query.brandId}
								modelId={query.modelId}
								mainCategoryId={mainCategoryId}
								categoryId={query.categoryId}
								stateId={query.stateId}
								regionId={query.regionId}
								administrativeRegionId={query.administrativeRegionId}
								cityId={query.cityId}
								directivaId={query.directivaId}
								vicepresidenciaEjecutivaId={query.vicepresidenciaEjecutivaId}
								vicepresidenciaId={query.vicepresidenciaId}
								handleChange={handleChange}
							/>

							<OtherComputerFilter
								handleChange={handleChange}
								ipAddress={query.ipAddress}
								memoryRamCapacity={query.memoryRamCapacity}
								memoryRamCapacityOperator={query.memoryRamCapacityOperator}
								hardDriveCapacity={query.hardDriveCapacity}
								hardDriveCapacityOperator={query.hardDriveCapacityOperator}
								computerName={query.computerName}
								memoryRamTypeId={query.memoryRamTypeId}
								operatingSystemId={query.operatingSystemId}
								operatingSystemArqId={query.operatingSystemArqId}
								hardDriveTypeId={query.hardDriveTypeId}
								processor={query.processor}
							/>
						</Suspense>
					</FilterAside>
				</FilterSection>
				<ButtonSection
					handleExportToExcel={handleDownloadToExcel}
					loading={isDownloading}
					filterButton
					handleClear={cleanFilters}
					handleAdd={() => {
						navigate('/form/device/add')
					}}
					handleFilter={() => filterAsideRef.current?.handleOpen()}
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
		</>
	)
}
