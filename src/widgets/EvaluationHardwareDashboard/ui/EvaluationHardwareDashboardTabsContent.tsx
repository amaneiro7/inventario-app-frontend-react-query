import { lazy, memo, Suspense } from 'react'
import { TabsContent } from '@/shared/ui/Tabs'
import { WidgetErrorFallback } from '@/shared/ui/ErrorBoundary/WidgetErrorFallback'
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary/ErrorBoundary'
import { TableSkeleton } from '@/widgets/tables/TableSkeleton'
import type { EvaluationHardwareDashboardResponse } from '@/entities/devices/deviceEvaluation/domain/dto/EvaluationHardwareDashboard.dto'
import type { EvaluationHardwareDashboardFilters } from '@/entities/devices/deviceEvaluation/application/createEvaluationHardwareQueryParams'

const EvaluationHardwareChart = lazy(() =>
	import('./EvaluationHardwareChart').then(m => ({
		default: m.EvaluationHardwareChart
	}))
)

const EvaluationHardwareContainer = lazy(() =>
	import('./EvaluationHardwareContainer').then(m => ({
		default: m.EvaluationHardwareDashboardContainer
	}))
)

interface EvaluationHardwareDashboardTabsContentProps {
	data?: EvaluationHardwareDashboardResponse
	query: EvaluationHardwareDashboardFilters
	handlePageSize: (pageSize: number) => void
	handlePageClick: ({ selected }: { selected: number }) => void
	handleSort: (field: string) => Promise<void>
	handleChange: (name: string, value: string | number) => void
	isLoading?: boolean
	dataUpdatedAt: number
	isFetching: boolean
	isError: boolean
	error: Error | null
}

export const EvaluationHardwareDashboardTabsContent = memo(
	({
		handleChange,
		handlePageClick,
		handlePageSize,
		handleSort,
		error,
		isError,
		isLoading = false,
		data,
		query
	}: EvaluationHardwareDashboardTabsContentProps) => {
		return (
			<>
				<TabsContent value="table" className="mt-4">
					<ErrorBoundary
						fallback={({ onReset }) => (
							<WidgetErrorFallback
								onReset={onReset}
								variant="default"
								message="No se pudo cargar la tabla de evaluación de hardware."
							/>
						)}
					>
						<Suspense fallback={<TableSkeleton withTab howManyTabs={3} />}>
							<EvaluationHardwareContainer
								handlePageSize={handlePageSize}
								handlePageClick={handlePageClick}
								handleChange={handleChange}
								handleSort={handleSort}
								query={query}
								data={data}
								isError={isError}
								isLoading={isLoading}
							/>
						</Suspense>
					</ErrorBoundary>
				</TabsContent>
				{/* Grafico */}
				<TabsContent value="chart" className="mt-4">
					<ErrorBoundary
						fallback={({ onReset }) => (
							<WidgetErrorFallback
								onReset={onReset}
								variant="default"
								message="No se pudo cargar el gráfico de compatibilidad."
							/>
						)}
					>
						<EvaluationHardwareChart
							summary={data?.summary}
							error={error}
							isError={isError}
							isLoading={isLoading}
						/>
					</ErrorBoundary>
				</TabsContent>
			</>
		)
	}
)

EvaluationHardwareDashboardTabsContent.displayName = 'EvaluationHardwareDashboardTabsContent'
