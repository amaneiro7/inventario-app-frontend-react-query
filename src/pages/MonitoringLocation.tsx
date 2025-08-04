import { lazy, Suspense } from 'react'
import { Loading } from '@/shared/ui/Loading'
import { Tabs, TabsTrigger, TabsList } from '@/shared/ui/Tabs'
import { useLocationMonitoringFilter } from '@/entities/locations/locationMonitoring/infra/hook/useLocationMonitoringFilters'
import { DetailsBoxWrapper } from '@/shared/ui/DetailsWrapper/DetailsBoxWrapper'
import { FilterSection } from '@/shared/ui/FilterSection'
import { LocationMonitoringSummary } from '@/widgets/monitoring/MonitoringSummary/ui/LocationMonitoringSummary'
import { LocationMonitoringTabsContent } from '@/widgets/monitoring/LocationMonitoring/ui/LocationMonitoringTabsContent'

const MainLocationMonitoringFilter = lazy(() =>
	import('@/widgets/monitoring/LocationMonitoring/ui/MainLocationMonitoringFilter').then(m => ({
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
						siteId={query.siteId}
						administrativeRegionId={query.administrativeRegionId}
						handleChange={handleChange}
					/>
				</FilterSection>
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
		</Suspense>
	)
}
