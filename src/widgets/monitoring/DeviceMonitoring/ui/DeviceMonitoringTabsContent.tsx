import { lazy, memo, Suspense } from 'react'
import { useGetAllDeviceMonitorings } from '@/entities/devices/deviceMonitoring/infra/hook/useGetAllDeviceMonitoring'
import { TabsContent } from '@/shared/ui/Tabs'
import { type DeviceMonitoringFilters } from '@/entities/devices/deviceMonitoring/application/createDeviceMonitoringQueryParams'
import { WidgetErrorFallback } from '@/shared/ui/ErrorBoundary/WidgetErrorFallback'
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary/ErrorBoundary'

const DeviceMonitoringContainer = lazy(() =>
	import('./DeviceMonitoringContainer').then(m => ({
		default: m.DeviceMonitoringContainer
	}))
)
const DeviceMonitoringMap = lazy(() =>
	import('./DeviceMonitoringMap').then(m => ({ default: m.DeviceMonitoringMap }))
)
const DeviceMonitoringChart = lazy(() =>
	import('../../MonitoringChart/ui/DeviceMonitoringChart').then(m => ({
		default: m.DeviceMonitoringChart
	}))
)

interface DeviceMonitoringTabsContentProps {
	query: DeviceMonitoringFilters
	handlePageSize: (pageSize: number) => void
	handlePageClick: ({ selected }: { selected: number }) => void
	handleSort: (field: string) => Promise<void>
	handleChange: (name: string, value: string | number) => void
}

export const DeviceMonitoringTabsContent = memo(
	({
		handleChange,
		handlePageClick,
		handlePageSize,
		handleSort,
		query
	}: DeviceMonitoringTabsContentProps) => {
		const { deviceMonitorings, isError, isLoading, isFetching } =
			useGetAllDeviceMonitorings(query)
		return (
			<>
				<TabsContent value="table" className="mt-4">
					<ErrorBoundary
						fallback={({ onReset }) => (
							<WidgetErrorFallback
								onReset={onReset}
								variant="default"
								message="No se pudo cargar el grafico de conectividad."
							/>
						)}
					>
						<Suspense>
							<DeviceMonitoringContainer
								handlePageSize={handlePageSize}
								handlePageClick={handlePageClick}
								handleChange={handleChange}
								handleSort={handleSort}
								query={query}
								deviceMonitorings={deviceMonitorings}
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
							<DeviceMonitoringMap
								deviceMonitorings={deviceMonitorings}
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
							<DeviceMonitoringChart query={query} />
						</Suspense>
					</ErrorBoundary>
				</TabsContent>
			</>
		)
	}
)
DeviceMonitoringTabsContent.displayName = 'DeviceMonitoringTabsContent'
