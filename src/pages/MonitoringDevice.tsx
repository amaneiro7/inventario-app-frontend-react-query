import { lazy, Suspense } from 'react'
import { Tabs, TabsTrigger, TabsList } from '@/shared/ui/Tabs'
import { useDeviceMonitoringFilter } from '@/entities/devices/deviceMonitoring/infra/hook/useDeviceMonitoringFilters'
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary/ErrorBoundary'
import { WidgetErrorFallback } from '@/shared/ui/ErrorBoundary/WidgetErrorFallback'
import CollapsableBoxWrapper from '@/shared/ui/DetailsWrapper/CollapsableBoxWrapper'
import { PrimaryFilterSkeleton } from '@/widgets/tables/PrimaryFilterSkeleton'

const MainDeviceMonitoringFilter = lazy(() =>
	import('@/widgets/monitoring/DeviceMonitoring/ui/MainDeviceMonitoringFilter').then(m => ({
		default: m.MainDeviceMonitoringFilter
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
const DeviceMonitoringSummary = lazy(() =>
	import('@/widgets/monitoring/MonitoringSummary/ui/DeviceMonitoringSummary').then(m => ({
		default: m.DeviceMonitoringSummary
	}))
)
const DeviceMonitoringTabsContent = lazy(() =>
	import('@/widgets/monitoring/DeviceMonitoring/ui/DeviceMonitoringTabsContent').then(m => ({
		default: m.DeviceMonitoringTabsContent
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
						message="Los datos Totales no estan disponibles."
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
					<CollapsableBoxWrapper title="Filtros de búsqueda" isDefaultOpen>
						<FilterSection>
							<Suspense fallback={<PrimaryFilterSkeleton inputQuantity={9} />}>
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
					</CollapsableBoxWrapper>
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
