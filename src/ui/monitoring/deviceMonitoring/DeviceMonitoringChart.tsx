import { memo } from 'react'
import { useGetDeviceMonitoringDashboardByState } from '@/core/devices/deviceMonitoring/infra/hook/useGetDeviceMonitoringDashboardByState'

import { MonitoringChart } from '../MonitoringChart'

export const DeviceMonitoringChart = memo(() => {
	const { deviceMonitoringDashboardByState, isError, isLoading, error } =
		useGetDeviceMonitoringDashboardByState()

	return (
		<MonitoringChart
			error={error}
			isError={isError}
			isLoading={isLoading}
			monitoringDashboardByState={deviceMonitoringDashboardByState}
		/>
	)
})

DeviceMonitoringChart.displayName = 'DeviceMonitoringChart'
