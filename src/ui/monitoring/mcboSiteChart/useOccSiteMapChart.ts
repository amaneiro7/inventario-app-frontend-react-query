import { useMemo, useState } from 'react'
import { COLOR_THRESHOLDS, NO_DATA_COLOR, NO_EQUIPMENT_COLOR } from '../MapColors'
import { TypeOfSiteOptions } from '@/core/locations/typeOfSites/domain/entity/TypeOfSiteOptions'
import { AdministrativeRegionOptions } from '@/core/locations/administrativeRegion/domain/entity/AdministrativeRegionOptions'
import { type DeviceMonitoringFilters } from '@/core/devices/deviceMonitoring/application/createDeviceMonitoringQueryParams'
import { useGetDeviceMonitoringDashboardByLocation } from '@/core/devices/deviceMonitoring/infra/hook/useGetDeviceMonitoringDashboardByLocation'

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
	const { deviceMonitoringDashboardByLocation, isError, isLoading, error } =
		useGetDeviceMonitoringDashboardByLocation(query)
	const [selectedLocation, setSelectedLocation] = useState<string | null>(null)

	const handleStateClick = (location: string) => {
		setSelectedLocation(location)
	}

	// Memoize the data processing to avoid re-calculating on every render
	const processedLocationDataForMap = useMemo(() => {
		if (
			!deviceMonitoringDashboardByLocation ||
			deviceMonitoringDashboardByLocation.length === 0
		) {
			return []
		}

		return deviceMonitoringDashboardByLocation.flatMap(admRegion => {
			return admRegion.sites.map(site => {
				const data: Record<string, StateData> = {}
				site.locations.forEach(location => {
					const percentage = Number(
						(location.total > 0
							? (location.onlineCount * 100) / location.total
							: -1
						).toFixed(2)
					)

					data[location.name] = {
						name: location.name,
						onlineCount: location.onlineCount,
						offlineCount: location.offlineCount,
						total: location.total,
						percentage
					}
				})
				return data
			})
		})
	}, [deviceMonitoringDashboardByLocation])

	const getColor = useMemo(() => {
		return (location: string) => {
			const percentage = processedLocationDataForMap.flatMap(data => data)

			// if (percentage === undefined) {
			// 	return NO_DATA_COLOR // Gray for states not in data (e.g., no monitoring info for that state)
			// }
			// if (percentage === -1) {
			// 	return NO_EQUIPMENT_COLOR // Specific color for states with 0 total equipment
			// }

			// // Find the first threshold that the percentage meets
			// for (const thresholdItem of COLOR_THRESHOLDS) {
			// 	if (percentage >= thresholdItem.threshold) {
			// 		return thresholdItem.color
			// 	}
			// }
			// return NO_DATA_COLOR // Fallback, though typically covered by the 0% threshold
		}
	}, [processedLocationDataForMap]) // Recalculate only when processedLocationDataForMap changes

	return {
		deviceMonitoringDashboardByLocation,
		isError,
		isLoading,
		error,
		selectedLocation,
		processedLocationDataForMap,
		handleStateClick
		// getColor
	}
}
