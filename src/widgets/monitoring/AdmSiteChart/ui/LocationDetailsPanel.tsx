import { lazy } from 'react'
import { type DeviceMonitoringDashboardByLocationDto } from '@/entities/devices/deviceMonitoring/domain/dto/DeviceMonitoringDashboardByLocation.dto'

const DetailsPanel = lazy(() =>
	import('@/shared/ui/DetailsPanel').then(m => ({ default: m.DetailsPanel }))
)
const NetworkSiteLinkMonitoring = lazy(() =>
	import('./NetworkSiteLinkMonitoring').then(m => ({ default: m.NetworkSiteLinkMonitoring }))
)
interface LocationDetailsPanelProps {
	selectedFloor: string | null
	locations?: DeviceMonitoringDashboardByLocationDto
}
export const LocationDetailsPanel = ({ selectedFloor, locations }: LocationDetailsPanelProps) => {
	const locationData = locations?.sites.flatMap(site => site.locations)

	const locationSelectedData = locationData?.find(location => location.name === selectedFloor)

	const hasSelectedStateData: boolean = selectedFloor && locationSelectedData ? true : false
	const currentStateData = hasSelectedStateData ? true : false

	// Unique IDs for ARIA attributes
	const panelTitleId = 'state-details-title'
	const panelDescriptionId = 'state-details-description'
	return (
		<DetailsPanel
			panelType="devices"
			selectedFloor={selectedFloor}
			panelDescriptionId={panelDescriptionId}
			panelTitleId={panelTitleId}
			onlineCount={locationSelectedData?.onlineCount}
			total={locationSelectedData?.total}
			offlineCount={locationSelectedData?.offlineCount}
			isDataLoaded={hasSelectedStateData}
			currentStateData={currentStateData}
			departments={locationSelectedData?.vpeName}
		>
			<NetworkSiteLinkMonitoring selectedFloor={selectedFloor} />
		</DetailsPanel>
	)
}
