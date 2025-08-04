import { lazy, Suspense } from 'react'
import { Loading } from '@/shared/ui/Loading'
import { Tabs, TabsTrigger, TabsList } from '@/shared/ui/Tabs'

import { useDeviceMonitoringFilter } from '@/entities/devices/deviceMonitoring/infra/hook/useDeviceMonitoringFilters'
import { DetailsBoxWrapper } from '@/shared/ui/DetailsWrapper/DetailsBoxWrapper'
import { FilterSection } from '@/shared/ui/FilterSection'
import { DeviceMonitoringSummary } from '@/ui/monitoring/deviceMonitoring/DeviceMonitoringSummary'
import { DeviceMonitoringTabsContent } from '@/ui/monitoring/deviceMonitoring/DeviceMonitoringTabsContent'

const MainDeviceMonitoringFilter = lazy(() =>
	import('@/ui/monitoring/deviceMonitoring/MainDeviceMonitoringFilter').then(m => ({
		default: m.MainDeviceMonitoringFilter
	}))
)

export default function MonitoringDevice() {
	const { cleanFilters, handlePageSize, handlePageClick, handleSort, handleChange, ...query } =
		useDeviceMonitoringFilter()
	return (
		<Suspense fallback={<Loading />}>
			<DeviceMonitoringSummary query={query} />
			<DetailsBoxWrapper>
				<FilterSection>
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
				<DeviceMonitoringTabsContent
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
