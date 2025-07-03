import { useMemo, useState } from 'react'
import { useGetDeviceMonitoringDashboardByLocation } from '@/core/devices/deviceMonitoring/infra/hook/useGetDeviceMonitoringDashboardByLocation'
import { TypeOfSiteOptions } from '@/core/locations/typeOfSites/domain/entity/TypeOfSiteOptions'
import { AdministrativeRegionOptionsName } from '@/core/locations/administrativeRegion/domain/entity/AdministrativeRegionOptionsNames'
import { type DeviceMonitoringFilters } from '@/core/devices/deviceMonitoring/application/createDeviceMonitoringQueryParams'

export function useOccSiteMapChart() {
	const [selectedFloor, setSelectedFloor] = useState<string | null>(null)
	const [selectedAdmRegion, setSelectedAdmRegion] = useState<string | null>(null)
	const query: DeviceMonitoringFilters = useMemo(
		() => ({
			typeOfSiteId: TypeOfSiteOptions.ADMINISTRATIVE
		}),
		[]
	)
	const { deviceMonitoringDashboardByLocation, isError, isLoading, error } =
		useGetDeviceMonitoringDashboardByLocation(query)

	// Establecer la región seleccionada por defecto a la primera de la lista
	if (deviceMonitoringDashboardByLocation && !selectedAdmRegion) {
		setSelectedAdmRegion(deviceMonitoringDashboardByLocation[0]?.name)
	}

	const handleFloorClick = (floorNumber: string | null) => {
		setSelectedFloor(floorNumber)
	}

	if (deviceMonitoringDashboardByLocation && !selectedAdmRegion) {
		const defaultAdmRegion = AdministrativeRegionOptionsName.OCCIDENTE
		const defaultOptions =
			deviceMonitoringDashboardByLocation.find(adm => adm.name === defaultAdmRegion)?.name ??
			deviceMonitoringDashboardByLocation[0].name

		setSelectedAdmRegion(defaultOptions)
	}

	const selectedRegionData = useMemo(() => {
		return deviceMonitoringDashboardByLocation?.find(
			admRegion => admRegion.name === selectedAdmRegion
		)
	}, [deviceMonitoringDashboardByLocation, selectedAdmRegion])
	return {
		deviceMonitoringDashboardByLocation,
		isError,
		isLoading,
		error,
		selectedAdmRegion,
		selectedRegionData,
		selectedFloor,
		handleFloorClick,
		setSelectedAdmRegion
	}
}
