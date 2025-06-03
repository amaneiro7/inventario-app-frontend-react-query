import { memo, Suspense } from 'react'
import { useGetAllDeviceMonitorings } from '@/core/devices/deviceMonitoring/infra/hook/useGetAllDeviceMonitoring'
import { TabsContent } from '@/components/Tabs'
import { type DeviceMonitoringFilters } from '@/core/devices/deviceMonitoring/application/createDeviceMonitoringQueryParams'

import { TableDeviceMonitoringWrapper } from './TableDeviceMonitoringWrapper'
import { DeviceMonitoringMap } from './DeviceMonitoringMap'
import { DeviceMonitoringChart } from './DeviceMonitoringChart'

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
					<Suspense>
						<TableDeviceMonitoringWrapper
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
				</TabsContent>
				<TabsContent value="map" className="mt-4">
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
				</TabsContent>
				<TabsContent value="chart" className="mt-4">
					<Suspense>
						<DeviceMonitoringChart />
					</Suspense>
				</TabsContent>
			</>
		)
	}
)
DeviceMonitoringTabsContent.displayName = 'DeviceMonitoringTabsContent'
