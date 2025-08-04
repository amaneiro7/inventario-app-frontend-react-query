import { useMemo } from 'react'
import { StateData } from './useMapChart'
import { DetailsPanel } from '../../../shared/ui/DetailsPanel'
import { NetworkStateLinkMonitoring } from './NetworkStateLinkMonitoring'

interface StateDetailsPanelProps {
	selectedState: string | null
	stateStats: Record<string, StateData>
}
export const StateDetailsPanel = ({ selectedState, stateStats }: StateDetailsPanelProps) => {
	// Determine if data for the selected state exists
	const hasSelectedStateData = selectedState && stateStats[selectedState]
	const currentStateData = hasSelectedStateData ? stateStats[selectedState] : null

	const { total, onlineCount, offlineCount } = useMemo(() => {
		return {
			total: hasSelectedStateData ? stateStats[selectedState]?.total : 0,
			onlineCount: hasSelectedStateData ? stateStats[selectedState]?.onlineCount : 0,
			offlineCount: hasSelectedStateData ? stateStats[selectedState]?.offlineCount : 0
		}
	}, [hasSelectedStateData])

	// Unique IDs for ARIA attributes
	const panelTitleId = 'state-details-title'
	const panelDescriptionId = 'state-details-description'
	return (
		<DetailsPanel
			panelType="locations"
			selectedFloor={selectedState}
			panelDescriptionId={panelDescriptionId}
			panelTitleId={panelTitleId}
			total={total}
			onlineCount={onlineCount}
			offlineCount={offlineCount}
			isDataLoaded={hasSelectedStateData ? true : false}
			currentStateData={currentStateData ? true : false}
		>
			<NetworkStateLinkMonitoring selectedState={selectedState} />
		</DetailsPanel>
	)
}
