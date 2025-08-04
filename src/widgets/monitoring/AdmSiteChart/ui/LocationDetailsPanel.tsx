import { DetailsPanel } from '../../../../shared/ui/DetailsPanel'
import { NetworkSiteLinkMonitoring } from './NetworkSiteLinkMonitoring'
import { type DeviceMonitoringDashboardByLocationDto } from '@/entities/devices/deviceMonitoring/domain/dto/DeviceMonitoringDashboardByLocation.dto'

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
		>
			<NetworkSiteLinkMonitoring selectedFloor={selectedFloor} />
		</DetailsPanel>
	)
}
