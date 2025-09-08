import { lazy, memo, Suspense } from 'react'
import { useGetAllLocationMonitorings } from '@/entities/locations/locationMonitoring/infra/hook/useGetAllLocationMonitoring'
import { TabsContent } from '@/shared/ui/Tabs'
import { type LocationMonitoringFilters } from '@/entities/locations/locationMonitoring/application/createLocationMonitoringQueryParams'
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary/ErrorBoundary'
import { WidgetErrorFallback } from '@/shared/ui/ErrorBoundary/WidgetErrorFallback'

const LocationMonitoringContainer = lazy(() =>
	import('./LocationMonitoringContainer').then(m => ({
		default: m.LocationMonitoringContainer
	}))
)
const LocationMonitoringMap = lazy(() =>
	import('./LocationMonitoringMap').then(m => ({ default: m.LocationMonitoringMap }))
)
const LocationMonitoringChart = lazy(() =>
	import('../../MonitoringChart/ui/LocationMonitoringChart').then(m => ({
		default: m.LocationMonitoringChart
	}))
)

interface LocationMonitoringTabsContentProps {
	query: LocationMonitoringFilters
	handlePageSize: (pageSize: number) => void
	handlePageClick: ({ selected }: { selected: number }) => void
	handleSort: (field: string) => Promise<void>
	handleChange: (name: string, value: string | number) => void
}

export const LocationMonitoringTabsContent = memo(
	({
		handleChange,
		handlePageClick,
		handlePageSize,
		handleSort,
		query
	}: LocationMonitoringTabsContentProps) => {
		const { locationMonitorings, isError, isLoading, isFetching } =
			useGetAllLocationMonitorings(query)
		return (
			<>
				<TabsContent value="table" className="mt-4">
					<ErrorBoundary
						fallback={({ onReset }) => (
							<WidgetErrorFallback
								onReset={onReset}
								variant="default"
								message="No se pudo cargar el grafico de conectividad"
							/>
						)}
					>
						<Suspense>
							<LocationMonitoringContainer
								handlePageSize={handlePageSize}
								handlePageClick={handlePageClick}
								handleChange={handleChange}
								handleSort={handleSort}
								query={query}
								locationMonitorings={locationMonitorings}
								isError={isError}
								isLoading={isLoading}
							/>
						</Suspense>
					</ErrorBoundary>
				</TabsContent>
				<TabsContent value="map" className="mt-4">
					<ErrorBoundary
						fallback={({ onReset }) => (
							<WidgetErrorFallback
								onReset={onReset}
								variant="default"
								message="No se pudo cargar la tabla de datos."
							/>
						)}
					>
						<Suspense>
							<LocationMonitoringMap
								locationMonitorings={locationMonitorings}
								pageSize={query.pageSize}
								handlePageSize={handlePageSize}
								handlePageClick={handlePageClick}
								isError={isError}
								isLoading={isLoading}
								isFetching={isFetching}
							/>
						</Suspense>
					</ErrorBoundary>
				</TabsContent>
				<TabsContent value="chart" className="mt-4">
					<ErrorBoundary
						fallback={({ onReset }) => (
							<WidgetErrorFallback
								onReset={onReset}
								variant="default"
								message="No se pudo cargar el mapa de datos."
							/>
						)}
					>
						<Suspense>
							<LocationMonitoringChart query={query} />
						</Suspense>
					</ErrorBoundary>
				</TabsContent>
			</>
		)
	}
)
LocationMonitoringTabsContent.displayName = 'LocationMonitoringTabsContent'
