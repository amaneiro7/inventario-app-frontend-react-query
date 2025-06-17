import { memo } from 'react'
import { useGetDeviceMonitoringDashboard } from '@/core/devices/deviceMonitoring/infra/hook/useGetDeviceMonitoringDashboard'
import { MonitoringSummary } from '../MonitoringSummary'
import { type DeviceMonitoringFilters } from '@/core/devices/deviceMonitoring/application/createDeviceMonitoringQueryParams'

interface DeviceMonitoringSummaryProps {
	query: DeviceMonitoringFilters
}

export const DeviceMonitoringSummary = memo(({ query }: DeviceMonitoringSummaryProps) => {
	const { deviceMonitoringDashboard, isError, isLoading, error, isFetching, dataUpdatedAt } =
		useGetDeviceMonitoringDashboard(query)
	return (
		<MonitoringSummary
			isError={isError}
			dataUpdatedAt={dataUpdatedAt}
			error={error}
			isFetching={isFetching}
			isLoading={isLoading}
			data={deviceMonitoringDashboard}
		/>
	)
})
