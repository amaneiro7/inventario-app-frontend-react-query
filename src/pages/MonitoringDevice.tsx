import { lazy, Suspense } from 'react'
import { Tabs, TabsTrigger, TabsList } from '@/shared/ui/Tabs'
import { useDeviceMonitoringFilter } from '@/entities/devices/deviceMonitoring/infra/hook/useDeviceMonitoringFilters'
import { DetailsBoxWrapper } from '@/shared/ui/DetailsWrapper/DetailsBoxWrapper'
import { FilterSection } from '@/shared/ui/FilterSection'
import { DeviceMonitoringSummary } from '@/widgets/monitoring/MonitoringSummary/ui/DeviceMonitoringSummary'
import { DeviceMonitoringTabsContent } from '@/widgets/monitoring/DeviceMonitoring/ui/DeviceMonitoringTabsContent'
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary/ErrorBoundary'
import { WidgetErrorFallback } from '@/shared/ui/ErrorBoundary/WidgetErrorFallback'

const PrimaryFilterSkeleton = lazy(() =>
	import('@/widgets/tables/PrimaryFilterSkeleton').then(m => ({
		default: m.PrimaryFilterSkeleton
	}))
)

const MainDeviceMonitoringFilter = lazy(() =>
	import('@/widgets/monitoring/DeviceMonitoring/ui/MainDeviceMonitoringFilter').then(m => ({
		default: m.MainDeviceMonitoringFilter
	}))
)

export default function MonitoringDevice() {
	const { cleanFilters, handlePageSize, handlePageClick, handleSort, handleChange, ...query } =
		useDeviceMonitoringFilter()
	return (
		<>
			<ErrorBoundary
				fallback={({ onReset }) => (
					<WidgetErrorFallback
						onReset={onReset}
						variant="compact"
						message="Los datos Totaloes no estan disponibles."
					/>
				)}
			>
				<DeviceMonitoringSummary query={query} />
			</ErrorBoundary>
			<DetailsBoxWrapper>
				<ErrorBoundary
					fallback={({ onReset }) => (
						<WidgetErrorFallback
							onReset={onReset}
							variant="default"
							message="No se pudieron cargar los filrtros."
						/>
					)}
				>
					<FilterSection>
						<Suspense fallback={<PrimaryFilterSkeleton inputQuantity={8} />}>
							<MainDeviceMonitoringFilter
								ipAddress={query.ipAddress}
								status={query.status}
								computerName={query.computerName}
								locationId={query.locationId}
								cityId={query.cityId}
								stateId={query.stateId}
								regionId={query.regionId}
								siteId={query.siteId}
								administrativeRegionId={query.administrativeRegionId}
								handleChange={handleChange}
							/>
						</Suspense>
					</FilterSection>
				</ErrorBoundary>
			</DetailsBoxWrapper>

			<Tabs defaultValue="chart">
				{/* <DetailsBoxWrapper> */}
				<TabsList className="grid max-w-fit grid-cols-3">
					<TabsTrigger bgColor="darkBlue" value="chart">
						Gráficos
					</TabsTrigger>
					<TabsTrigger bgColor="darkBlue" value="table">
						Tabla
					</TabsTrigger>
					<TabsTrigger bgColor="darkBlue" value="map">
						Mapa
					</TabsTrigger>
				</TabsList>
				{/* </DetailsBoxWrapper> */}
				<DeviceMonitoringTabsContent
					query={query}
					handleSort={handleSort}
					handleChange={handleChange}
					handlePageSize={handlePageSize}
					handlePageClick={handlePageClick}
				/>
			</Tabs>
		</>
	)
}
