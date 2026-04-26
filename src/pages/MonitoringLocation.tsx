import { lazy, Suspense } from 'react'
import { Tabs, TabsTrigger, TabsList } from '@/shared/ui/Tabs'
import { useLocationMonitoringFilter } from '@/entities/locations/locationMonitoring/infra/hook/useLocationMonitoringFilters'
import { WidgetErrorFallback } from '@/shared/ui/ErrorBoundary/WidgetErrorFallback'
import CollapsableBoxWrapper from '@/shared/ui/DetailsWrapper/CollapsableBoxWrapper'
import { PrimaryFilterSkeleton } from '@/widgets/tables/PrimaryFilterSkeleton'
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary/ErrorBoundary'

const DetailsBoxWrapper = lazy(() =>
	import('@/shared/ui/DetailsWrapper/DetailsBoxWrapper').then(m => ({
		default: m.DetailsBoxWrapper
	}))
)
const FilterSection = lazy(() =>
	import('@/shared/ui/FilterSection').then(m => ({ default: m.FilterSection }))
)
const LocationMonitoringSummary = lazy(() =>
	import('@/widgets/monitoring/MonitoringSummary/ui/LocationMonitoringSummary').then(m => ({
		default: m.LocationMonitoringSummary
	}))
)
const LocationMonitoringTabsContent = lazy(() =>
	import('@/widgets/monitoring/LocationMonitoring/ui/LocationMonitoringTabsContent').then(m => ({
		default: m.LocationMonitoringTabsContent
	}))
)

const MainLocationMonitoringFilter = lazy(() =>
	import('@/widgets/monitoring/LocationMonitoring/ui/MainLocationMonitoringFilter').then(m => ({
		default: m.MainLocationMonitoringFilter
	}))
)

export default function MonitoringLocation() {
	const { cleanFilters, handlePageSize, handlePageClick, handleSort, handleChange, ...query } =
		useLocationMonitoringFilter()
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
				<LocationMonitoringSummary query={query} />
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
						<Suspense fallback={<PrimaryFilterSkeleton inputQuantity={8} />}>
							<FilterSection>
								<MainLocationMonitoringFilter
									subnet={query.subnet}
									status={query.status}
									locationId={query.locationId}
									typeOfSiteId={query.typeOfSiteId}
									cityId={query.cityId}
									stateId={query.stateId}
									regionId={query.regionId}
									siteId={query.siteId}
									administrativeRegionId={query.administrativeRegionId}
									handleChange={handleChange}
								/>
							</FilterSection>
						</Suspense>
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
				<LocationMonitoringTabsContent
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
