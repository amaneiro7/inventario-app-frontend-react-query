import { lazy, Suspense } from 'react'
import { Loading } from '@/components/Loading'
import { Tabs, TabsTrigger, TabsList } from '@/components/Tabs'

import { useDeviceMonitoringFilter } from '@/core/devices/deviceMonitoring/infra/hook/useDeviceMonitoringFilters'
import { DetailsBoxWrapper } from '@/components/DetailsWrapper/DetailsBoxWrapper'
import { FilterSection } from '@/ui/List/FilterSection'
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

			<Tabs defaultValue="table">
				{/* <DetailsBoxWrapper> */}
				<TabsList className="grid grid-cols-3">
					<TabsTrigger bgColor="darkBlue" value="table">
						Tabla
					</TabsTrigger>
					<TabsTrigger bgColor="darkBlue" value="map">
						Mapa
					</TabsTrigger>
					<TabsTrigger bgColor="darkBlue" value="chart">
						Gráficos
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
