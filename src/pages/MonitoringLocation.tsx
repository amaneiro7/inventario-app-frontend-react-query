import { lazy, Suspense } from 'react'
import { Loading } from '@/components/Loading'
import { Tabs, TabsTrigger, TabsList } from '@/components/Tabs'
import { useLocationMonitoringFilter } from '@/core/locations/locationMonitoring/infra/hook/useLocationMonitoringFilters'
import { DetailsBoxWrapper } from '@/components/DetailsWrapper/DetailsBoxWrapper'
import { FilterSection } from '@/ui/List/FilterSection'
import { LocationMonitoringSummary } from '@/ui/monitoring/locationMonitoring/LocationMonitoringSummary'
import { LocationMonitoringTabsContent } from '@/ui/monitoring/locationMonitoring/LocationMonitoringTabsContent'

const MainLocationMonitoringFilter = lazy(() =>
	import('@/ui/monitoring/locationMonitoring/MainLocationMonitoringFilter').then(m => ({
		default: m.MainLocationMonitoringFilter
	}))
)

export default function MonitoringLocation() {
	const { cleanFilters, handlePageSize, handlePageClick, handleSort, handleChange, ...query } =
		useLocationMonitoringFilter()
	return (
		<Suspense fallback={<Loading />}>
			<LocationMonitoringSummary query={query} />
			<DetailsBoxWrapper>
				<FilterSection>
					<MainLocationMonitoringFilter
						subnet={query.subnet}
						status={query.status}
						locationId={query.locationId}
						typeOfSiteId={query.typeOfSiteId}
						cityId={query.cityId}
						stateId={query.stateId}
						regionId={query.regionId}
						administrativeRegionId={query.administrativeRegionId}
						handleChange={handleChange}
					/>
				</FilterSection>
			</DetailsBoxWrapper>

			<Tabs defaultValue="table">
				{/* <DetailsBoxWrapper> */}
				<TabsList className="grid grid-cols-4">
					<TabsTrigger bgColor="darkBlue" value="table">
						Tabla
					</TabsTrigger>
					<TabsTrigger bgColor="darkBlue" value="map">
						Mapa
					</TabsTrigger>
					<TabsTrigger bgColor="darkBlue" value="chart">
						Gráficos
					</TabsTrigger>
					<TabsTrigger bgColor="darkBlue" value="mapChart">
						Mapa interactivo
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
		</Suspense>
	)
}
