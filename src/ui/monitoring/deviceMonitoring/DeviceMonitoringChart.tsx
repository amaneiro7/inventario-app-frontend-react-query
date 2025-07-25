import { memo } from 'react'
import { useGetDeviceMonitoringDashboardByState } from '@/core/devices/deviceMonitoring/infra/hook/useGetDeviceMonitoringDashboardByState'
import { MonitoringChart } from '../MonitoringChart'
import { type DeviceMonitoringFilters } from '@/core/devices/deviceMonitoring/application/createDeviceMonitoringQueryParams'

interface DeviceMonitoringChartProps {
	query: DeviceMonitoringFilters
}

export const DeviceMonitoringChart = memo(({ query }: DeviceMonitoringChartProps) => {
	const { deviceMonitoringDashboardByState, isError, isLoading, error } =
		useGetDeviceMonitoringDashboardByState(query)

	return (
		<MonitoringChart
			chartType="devices"
			error={error}
			isError={isError}
			isLoading={isLoading}
			monitoringDashboardByState={deviceMonitoringDashboardByState}
		/>
	)
})

DeviceMonitoringChart.displayName = 'DeviceMonitoringChart'
