import { lazy, Suspense } from 'react'
import { useEvaluationHardwareDashboardFilter } from '@/entities/devices/deviceEvaluation/infra/hook/useEvaluationHardwareDashboardFilters'
import { useGetEvaluationHardwareDashboard } from '@/entities/devices/deviceEvaluation/infra/hook/useGetEvaluationHardwareDashboard'
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary/ErrorBoundary'
import { WidgetErrorFallback } from '@/shared/ui/ErrorBoundary/WidgetErrorFallback'
import { Tabs, TabsTrigger, TabsList } from '@/shared/ui/Tabs'
import CollapsableBoxWrapper from '@/shared/ui/DetailsWrapper/CollapsableBoxWrapper'
import { PrimaryFilterSkeleton } from '@/widgets/tables/PrimaryFilterSkeleton'
import { ButtonSectionSkeleton } from '@/shared/ui/ButttonSection/ButtonSectionSkeleton'
import { useDownloadExcelService } from '@/shared/lib/hooks/useDownloadExcelService'
import { DetailsWrapper } from '@/shared/ui/DetailsWrapper/DetailsWrapper'

const MainEvaluationHardwareFilter = lazy(() =>
	import('@/widgets/EvaluationHardwareDashboard/ui/MainEvaluationHardwareFilter').then(m => ({
		default: m.MainEvaluationHardwareFilter
	}))
)

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

const EvaluationHardwareDashboardSummary = lazy(() =>
	import('@/widgets/EvaluationHardwareDashboard/ui/EvaluationHardwareDashboardSummary').then(
		m => ({
			default: m.EvaluationHardwareDashboardSummary
		})
	)
)
const EvaluationHardwareDashboardTabsContent = lazy(() =>
	import('@/widgets/EvaluationHardwareDashboard/ui/EvaluationHardwareDashboardTabsContent').then(
		m => ({
			default: m.EvaluationHardwareDashboardTabsContent
		})
	)
)

export default function MonitoringDeviceEvaluationHardware() {
	const { cleanFilters, handlePageSize, handlePageClick, handleSort, handleChange, ...query } =
		useEvaluationHardwareDashboardFilter()
	const { dataUpdatedAt, isError, isLoading, error, isFetching, data } =
		useGetEvaluationHardwareDashboard(query)

	const { download, isDownloading } = useDownloadExcelService()

	const handleDownloadToExcel = async () => {
		await download({ source: 'evaluationHardware', query })
	}
	return (
		<DetailsWrapper>
			<ErrorBoundary
				fallback={({ onReset }) => (
					<WidgetErrorFallback
						onReset={onReset}
						variant="compact"
						message="Los datos de resumen no están disponibles."
					/>
				)}
			>
				<EvaluationHardwareDashboardSummary
					dataUpdatedAt={dataUpdatedAt}
					error={error}
					isFetching={isFetching}
					isLoading={isLoading}
					isError={isError}
					summary={data?.summary}
					rules={data?.migrationRule}
				/>
			</ErrorBoundary>
			<ErrorBoundary
				fallback={({ onReset }) => (
					<WidgetErrorFallback
						onReset={onReset}
						variant="default"
						message="No se pudieron cargar los filtros."
					/>
				)}
			>
				<DetailsBoxWrapper>
					<CollapsableBoxWrapper title="Filtros de búsqueda" isDefaultOpen>
						<Suspense
							fallback={
								<>
									<PrimaryFilterSkeleton inputQuantity={9} />
									<ButtonSectionSkeleton
										hasAddButton={false}
										hasFilterButton={false}
									/>
								</>
							}
						>
							<FilterSection>
								<MainEvaluationHardwareFilter
									locationId={query.locationId}
									cityId={query.cityId}
									stateId={query.stateId}
									regionId={query.regionId}
									serial={query.serial}
									categoryId={query.categoryId}
									typeOfSiteId={query.typeOfSiteId}
									isApto={query.isApto}
									isDiskApto={query.isDiskApto}
									isRamApto={query.isRamApto}
									isProcessorApto={query.isProcessorApto}
									administrativeRegionId={query.administrativeRegionId}
									handleChange={handleChange}
								/>
							</FilterSection>
							<ButtonSection
								handleExportToExcel={handleDownloadToExcel}
								loading={isDownloading}
								handleClear={cleanFilters}
							/>
						</Suspense>
					</CollapsableBoxWrapper>
				</DetailsBoxWrapper>
			</ErrorBoundary>

			<Tabs defaultValue="chart">
				{/* <DetailsBoxWrapper> */}
				<TabsList className="grid max-w-fit grid-cols-2">
					<TabsTrigger bgColor="darkBlue" value="chart">
						Gráficos
					</TabsTrigger>
					<TabsTrigger bgColor="darkBlue" value="table">
						Tabla
					</TabsTrigger>
				</TabsList>
				{/* </DetailsBoxWrapper> */}
				<EvaluationHardwareDashboardTabsContent
					data={data}
					query={query}
					error={error}
					isError={isError}
					isLoading={isLoading}
					isFetching={isFetching}
					dataUpdatedAt={dataUpdatedAt}
					handleSort={handleSort}
					handleChange={handleChange}
					handlePageSize={handlePageSize}
					handlePageClick={handlePageClick}
				/>
			</Tabs>
		</DetailsWrapper>
	)
}
