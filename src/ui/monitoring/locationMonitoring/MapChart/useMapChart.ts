import { useMemo, useState } from 'react'
import { COLOR_THRESHOLDS, NO_DATA_COLOR, NO_EQUIPMENT_COLOR } from './MapColors'
import { useGetLocationMonitoringDashboardByState } from '@/core/locations/locationMonitoring/infra/hook/useGetLocationMonitoringDashboardByState'

export type StateData = {
	name: string
	onlineCount: number
	offlineCount: number
	total: number
	percentage: number
}

export function useMapChart() {
	const { locationMonitoringDashboardByState, isError, isLoading, error } =
		useGetLocationMonitoringDashboardByState()
	const [selectedState, setSelectedState] = useState<string | null>(null)

	const handleStateClick = (stateName: string) => {
		setSelectedState(stateName)
	}

	// Memoize the data processing to avoid re-calculating on every render
	const processedStateData = useMemo(() => {
		if (!locationMonitoringDashboardByState?.byState) {
			return {}
		}

		const data: Record<string, StateData> = {}
		locationMonitoringDashboardByState.byState.forEach(state => {
			// Handle division by zero for total = 0
			const percentage = state.total > 0 ? (state.onlineCount * 100) / state.total : -1 // Use -1 for no equipment
			data[state.stateName] = {
				name: state.stateName,
				onlineCount: state.onlineCount,
				offlineCount: state.offlineCount,
				total: state.total,
				percentage
			}
		})
		return data
	}, [locationMonitoringDashboardByState]) // Recalculate only when locationMonitoringDashboardByState changes

	// Memoize the getColor function to prevent re-creation on every render
	const getColor = useMemo(() => {
		return (stateName: string) => {
			const percentage = processedStateData[stateName]?.percentage

			if (percentage === undefined) {
				return NO_DATA_COLOR // Gray for states not in data (e.g., no monitoring info for that state)
			}
			if (percentage === -1) {
				return NO_EQUIPMENT_COLOR // Specific color for states with 0 total equipment
			}

			// Find the first threshold that the percentage meets
			for (const thresholdItem of COLOR_THRESHOLDS) {
				if (percentage >= thresholdItem.threshold) {
					return thresholdItem.color
				}
			}
			return NO_DATA_COLOR // Fallback, though typically covered by the 0% threshold
		}
	}, [processedStateData]) // Recalculate only when processedStateData changes

	return {
		locationMonitoringDashboardByState,
		isError,
		isLoading,
		error,
		selectedState,
		processedStateData,
		handleStateClick,
		getColor
	}
}
