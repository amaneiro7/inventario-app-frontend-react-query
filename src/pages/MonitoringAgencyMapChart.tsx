import { lazy } from 'react'

const MapChart = lazy(() =>
	import('@/widgets/monitoring/MapChart/ui/MapChart').then(m => ({ default: m.MapChart }))
)
export default function MonitoringAgencyMapChart() {
	return <MapChart />
}
