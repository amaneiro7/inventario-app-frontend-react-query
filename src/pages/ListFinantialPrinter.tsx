import { lazy, Suspense, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDownloadExcelService } from '@/shared/lib/hooks/useDownloadExcelService'
import { useFinantialPrinterFilter } from '@/entities/devices/devices/infra/hook/useFinantialPrinterFilters'
//components
import { PrimaryFilterSkeleton } from '@/widgets/tables/PrimaryFilterSkeleton'
import { ButtonSectionSkeleton } from '@/shared/ui/ButttonSection/ButtonSectionSkeleton'
// Types
import { type FilterAsideRef } from '@/widgets/FilterAside'
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary/ErrorBoundary'
import { WidgetErrorFallback } from '@/shared/ui/ErrorBoundary/WidgetErrorFallback'
import { TableSkeleton } from '@/widgets/tables/TableSkeleton'

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

const ComputerPrimaryFilter = lazy(() =>
	import('@/features/computer-filter/ui/ComputerPrimaryFilter').then(m => ({
		default: m.ComputerPrimaryFilter
	}))
)

const DevicePrimaryFilter = lazy(() =>
	import('@/features/device-filter/ui/DevicePrimaryFilter').then(m => ({
		default: m.DevicePrimaryFilter
	}))
)
const TableFinantialWrapper = lazy(() =>
	import('@/widgets/tables/FinantialPrinterTable').then(m => ({
		default: m.TableFinantialWrapper
	}))
)

export default function ListFinantialPrinter() {
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
	} = useFinantialPrinterFilter()

	const { download, isDownloading } = useDownloadExcelService()

	const handleDownloadToExcel = async () => {
		await download({ source: 'finantialPrinter', query })
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
								mainCategoryId={mainCategoryId}
								administrativeRegionId={query.administrativeRegionId}
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
					<TableFinantialWrapper
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
