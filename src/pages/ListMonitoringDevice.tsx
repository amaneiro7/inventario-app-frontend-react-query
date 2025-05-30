import { lazy, Suspense } from 'react'
import { Loading } from '@/components/Loading'
import { StatCard } from '@/ui/Home/StatCard'
import { Server, Wifi, WifiOff } from 'lucide-react'
import { Tabs, TabsContent, TabsTrigger, TabsList } from '@/components/Tabs'

import { DetailsBoxWrapper } from '@/components/DetailsWrapper/DetailsBoxWrapper'
import { FilterSection } from '@/ui/List/FilterSection'
import { useDeviceMonitoringFilter } from '@/core/devices/deviceMonitoring/infra/hook/useDeviceMonitoringFilters'

const MainDeviceMonitoringFilter = lazy(() =>
	import('@/ui/List/deviceMonitoring/MainDeviceMonitoringFilter').then(m => ({
		default: m.MainDeviceMonitoringFilter
	}))
)

const TableDeviceMonitoringWrapper = lazy(() =>
	import('@/ui/List/deviceMonitoring/TableDeviceMonitoringWrapper').then(m => ({
		default: m.TableDeviceMonitoringWrapper
	}))
)

export default function ListMonitoringDevice() {
	const { cleanFilters, handlePageSize, handlePageClick, handleSort, handleChange, ...query } =
		useDeviceMonitoringFilter()
	return (
		<Suspense fallback={<Loading />}>
			<section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
				<StatCard
					title="Total de equipos"
					value={250}
					icon={Server}
					color="blue"
					description="Equipos monitoreados"
				/>
				<StatCard
					title="Equipos activos"
					value={250}
					icon={Wifi}
					color="green"
					description="80.0& del total"
				/>
				<StatCard
					title="Equipos inactivos"
					value={250}
					icon={WifiOff}
					color="red"
					description="20.0& del total"
				/>
			</section>
			<DetailsBoxWrapper>
				<FilterSection>
					<MainDeviceMonitoringFilter
						ipAddress={query.ipAddress}
						computerName={query.computerName}
						locationId={query.locationId}
						cityId={query.cityId}
						stateId={query.stateId}
						regionId={query.regionId}
						administrativeRegionId={query.administrativeRegionId}
						handleChange={handleChange}
					/>
				</FilterSection>
			</DetailsBoxWrapper>

			<Tabs defaultValue="table">
				<TabsList className="grid w-fit grid-cols-3">
					<TabsTrigger value="table">Tabla</TabsTrigger>
					<TabsTrigger value="map">Mapa</TabsTrigger>
					<TabsTrigger value="chart">Gráficos</TabsTrigger>
				</TabsList>
				<TabsContent value="table" className="mt-4">
					<TableDeviceMonitoringWrapper
						handlePageSize={handlePageSize}
						handlePageClick={handlePageClick}
						handleChange={handleChange}
						handleSort={handleSort}
						query={query}
					/>
				</TabsContent>
				<TabsContent value="map" className="mt-4">
					{/* <DeviceMap
						devices={filteredDevices}
						locations={locations.filter(l => l !== 'all')}
					/> */}
				</TabsContent>
				<TabsContent value="chart" className="mt-4">
					{/* <DeviceChart
						devices={filteredDevices}
						locations={locations.filter(l => l !== 'all')}
					/> */}
				</TabsContent>
			</Tabs>
		</Suspense>
	)
}
