interface LocationMonitoringDashboard {
	online: number
	offline: number
}

export const useTransformToPieChartData = (data: LocationMonitoringDashboard) => {
	return [
		{
			name: 'En línea',
			count: data.online
		},
		{
			name: 'Fuera de línea',
			count: data.offline
		}
	]
}
