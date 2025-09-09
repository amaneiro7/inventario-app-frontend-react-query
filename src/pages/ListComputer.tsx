import { lazy, Suspense, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useComputerFilter } from '@/entities/devices/devices/infra/hook/useComputerFilters'
import { useDownloadExcelService } from '@/shared/lib/hooks/useDownloadExcelService'
//components
import { InputFallback } from '@/shared/ui/Loading/InputFallback'
import { PrimaryFilterSkeleton } from '@/widgets/tables/PrimaryFilterSkeleton'
import { ButtonSectionSkeleton } from '@/shared/ui/ButttonSection/ButtonSectionSkeleton'
import { TableSkeleton } from '@/widgets/tables/TableSkeleton'
// Types
import { type FilterAsideRef } from '@/widgets/FilterAside'
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary/ErrorBoundary'
import { WidgetErrorFallback } from '@/shared/ui/ErrorBoundary/WidgetErrorFallback'

const DetailsBoxWrapper = lazy(() =>
	import('@/shared/ui/DetailsWrapper/DetailsBoxWrapper').then(m => ({
		default: m.DetailsBoxWrapper
	}))
)
const FilterSection = lazy(() =>
	import('@/shared/ui/FilterSection').then(m => ({ default: m.FilterSection }))
)
const ButtonSection = lazy(() =>
	import('@/shared/ui/ButttonSection/ButtonSection').then(m => ({ default: m.ButtonSection }))
)

const FilterAside = lazy(() =>
	import('@/widgets/FilterAside').then(m => ({ default: m.FilterAside }))
)

const TableWrapper = lazy(() =>
	import('@/widgets/tables/ComputerTable/ComputerTable').then(m => ({ default: m.TableWrapper }))
)

const DevicePrimaryFilter = lazy(() =>
	import('@/features/device-filter/ui/DevicePrimaryFilter').then(m => ({
		default: m.DevicePrimaryFilter
	}))
)
const OtherComputerFilter = lazy(() =>
	import('@/features/device-filter/ui/OtherComputerFilter').then(m => ({
		default: m.OtherComputerFilter
	}))
)
const ComputerOrderByCombobox = lazy(() =>
	import('@/entities/devices/devices/infra/ui/ComputerOrderByComboBox').then(m => ({
		default: m.ComputerOrderByCombobox
	}))
)

const ComputerPrimaryFilter = lazy(() =>
	import('@/features/computer-filter/ui/ComputerPrimaryFilter').then(m => ({
		default: m.ComputerPrimaryFilter
	}))
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
			<ErrorBoundary
				fallback={({ onReset }) => (
					<WidgetErrorFallback
						onReset={onReset}
						variant="default"
						message="Error al cargar los filtros."
					/>
				)}
			>
				<DetailsBoxWrapper>
					<FilterSection>
						<Suspense fallback={<PrimaryFilterSkeleton />}>
							<ComputerPrimaryFilter
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
						</Suspense>

						<Suspense fallback={null}>
							<FilterAside ref={filterAsideRef}>
								<DevicePrimaryFilter
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
									operatingSystem={query.operatingSystem}
									operatingSystemArqId={query.operatingSystemArqId}
									hardDriveTypeId={query.hardDriveTypeId}
									processor={query.processor}
								/>
							</FilterAside>
						</Suspense>
					</FilterSection>
					<Suspense fallback={<ButtonSectionSkeleton />}>
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
					</Suspense>
				</DetailsBoxWrapper>
			</ErrorBoundary>
			<ErrorBoundary
				fallback={({ onReset }) => (
					<WidgetErrorFallback
						onReset={onReset}
						variant="default"
						message="No se pudo cargar la tabla de datos."
					/>
				)}
			>
				<Suspense fallback={<TableSkeleton withTab />}>
					<TableWrapper
						handlePageSize={handlePageSize}
						handlePageClick={handlePageClick}
						handleChange={handleChange}
						handleSort={handleSort}
						query={query}
					/>
				</Suspense>
			</ErrorBoundary>
		</>
	)
}
