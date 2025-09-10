import { lazy, memo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/Card'
import { useInfoMonitoringChart } from '../Model/useInfoMonitoringChart'
import { type LocationMonitoringDashboardByStateDto } from '@/entities/locations/locationMonitoring/domain/dto/LocationMonitoringDashboardByState.dto'
import { type DeviceMonitoringDashboardByStateDto } from '@/entities/devices/deviceMonitoring/domain/dto/DeviceMonitoringDashboardByState.dto'

const MonitoringCartContent = lazy(() =>
	import('./MonitoringCartContent').then(m => ({ default: m.MonitoringCartContent }))
)

interface MonitoringChartProps {
	isError: boolean
	isLoading: boolean
	error: Error | null
	monitoringDashboardByState?:
		| DeviceMonitoringDashboardByStateDto
		| LocationMonitoringDashboardByStateDto
	chartType: 'devices' | 'locations'
}

export const MonitoringChart = memo(
	({
		error,
		isError,
		isLoading,
		monitoringDashboardByState,
		chartType
	}: MonitoringChartProps) => {
		const { cardTitleId, cardDescriptionId, title, description } = useInfoMonitoringChart({
			chartType
		})

		return (
			<Card
				className="flex h-full w-full flex-col"
				role="region"
				aria-labelledby={cardTitleId}
				aria-describedby={cardDescriptionId}
			>
				<CardHeader>
					<CardTitle id={cardTitleId}>{title}</CardTitle>
					<CardDescription id={cardDescriptionId}>{description}</CardDescription>
				</CardHeader>
				<CardContent className="grid grid-cols-1 gap-6 overflow-hidden lg:grid-cols-[1fr_400px]">
					<MonitoringCartContent
						chartType={chartType}
						isError={isError}
						isLoading={isLoading}
						error={error}
						monitoringDashboardByState={monitoringDashboardByState}
					/>
				</CardContent>
			</Card>
		)
	}
)

MonitoringChart.displayName = 'MonitoringChart'
