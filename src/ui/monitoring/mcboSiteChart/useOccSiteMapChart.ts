import { useMemo, useState } from 'react'
import { COLOR_THRESHOLDS, NO_DATA_COLOR, NO_EQUIPMENT_COLOR } from '../MapColors'
import { TypeOfSiteOptions } from '@/core/locations/typeOfSites/domain/entity/TypeOfSiteOptions'
import { AdministrativeRegionOptions } from '@/core/locations/administrativeRegion/domain/entity/AdministrativeRegionOptions'
import { type DeviceMonitoringFilters } from '@/core/devices/deviceMonitoring/application/createDeviceMonitoringQueryParams'

import { useGetAllDeviceMonitorings } from '@/core/devices/deviceMonitoring/infra/hook/useGetAllDeviceMonitoring'
import { groupBy } from '@/utils/groupBy'

export type StateData = {
	name: string
	onlineCount: number
	offlineCount: number
	total: number
	percentage: number
}

export function useOccSiteMapChart() {
	const query: DeviceMonitoringFilters = useMemo(
		() => ({
			typeOfSiteId: TypeOfSiteOptions.ADMINISTRATIVE,
			administrativeRegionId: AdministrativeRegionOptions.OCCIDENTE
		}),
		[]
	)
	const { deviceMonitorings, isError, isLoading, error } = useGetAllDeviceMonitorings(query)
	const [selectedState, setSelectedState] = useState<string | null>(null)

	const handleStateClick = (stateName: string) => {
		setSelectedState(stateName)
	}

	// Memoize the data processing to avoid re-calculating on every render
	const processedStateData = useMemo(() => {
		if (!deviceMonitorings) {
			return {}
		}

		const data: Record<string, StateData> = {}
		const groupByLocation = groupBy(deviceMonitorings.data, device => device.location.name)
		return Array.from(groupByLocation.entries())

		// return deviceMonitorings.data
	}, [deviceMonitorings]) // Recalculate only when deviceMonitorings changes

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
		deviceMonitorings,
		isError,
		isLoading,
		error,
		selectedState,
		processedStateData,
		handleStateClick
		// getColor
	}
}
