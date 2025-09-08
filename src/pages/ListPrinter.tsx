import { lazy, Suspense, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDownloadExcelService } from '@/shared/lib/hooks/useDownloadExcelService'
import { usePrinterFilter } from '@/entities/devices/devices/infra/hook/usePrinterFilters'
//components
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

const TablePrinterWrapper = lazy(() =>
	import('@/widgets/tables/PrinterTable').then(m => ({ default: m.TablePrinterWrapper }))
)

const DevicePrimaryFilter = lazy(() =>
	import('@/features/device-filter/ui/DevicePrimaryFilter').then(m => ({
		default: m.DevicePrimaryFilter
	}))
)
const ComputerPrimaryFilter = lazy(() =>
	import('@/features/computer-filter/ui/ComputerPrimaryFilter').then(m => ({
		default: m.ComputerPrimaryFilter
	}))
)
export default function ListPrinter() {
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
	} = usePrinterFilter()

	const { download, isDownloading } = useDownloadExcelService()

	const handleDownloadToExcel = async () => {
		await download({ source: 'printer', query })
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
								<Suspense>
									<DevicePrimaryFilter
										activo={query.activo}
										statusId={query.statusId}
										brandId={query.brandId}
										modelId={query.modelId}
										categoryId={query.categoryId}
										mainCategoryId={mainCategoryId}
										stateId={query.stateId}
										regionId={query.regionId}
										administrativeRegionId={query.administrativeRegionId}
										cityId={query.cityId}
										handleChange={handleChange}
									/>
								</Suspense>
							</FilterAside>
						</Suspense>
					</FilterSection>
					<Suspense fallback={<ButtonSectionSkeleton />}>
						<ButtonSection
							handleExportToExcel={handleDownloadToExcel}
							loading={isDownloading}
							handleClear={cleanFilters}
							handleAdd={() => {
								navigate('/form/device/add')
							}}
							filterButton
							handleFilter={() => filterAsideRef.current?.handleOpen()}
						/>
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
					<TablePrinterWrapper
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
