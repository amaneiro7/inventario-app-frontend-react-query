import { memo, useMemo } from 'react'
import { useGetAllDeviceMonitorings } from '@/entities/devices/deviceMonitoring/infra/hook/useGetAllDeviceMonitoring'
import { useMappedNetworkLinks } from '../Model/useMappedNetworkLinks'
import { TypeOfSiteOptions } from '@/entities/locations/typeOfSites/domain/entity/TypeOfSiteOptions'
import { GenericMonitoringList } from '@/shared/ui/GenericMonitoringList'
import { NetworkLinkItemCard } from './NetworkLinkItemCard'
import { type DeviceMonitoringFilters } from '@/entities/devices/deviceMonitoring/application/createDeviceMonitoringQueryParams'

interface NetworkLinkSelectedListProps {
	selectedFloor: string | null
}

export const NetworkSiteLinkMonitoring = memo(({ selectedFloor }: NetworkLinkSelectedListProps) => {
	const query: DeviceMonitoringFilters = useMemo(
		() => ({
			...(selectedFloor ? { locationName: selectedFloor } : {}),
			typeOfSiteId: TypeOfSiteOptions.ADMINISTRATIVE
		}),
		[selectedFloor]
	)

	const { deviceMonitorings, isLoading } = useGetAllDeviceMonitorings(query)
	const { networkLinks } = useMappedNetworkLinks(deviceMonitorings?.data)

	return (
		<GenericMonitoringList
			items={networkLinks}
			isLoading={isLoading}
			emptyMessage={`No se encontraron enlaces de red en ${
				selectedFloor ?? 'el estado seleccionado'
			}.`}
			emptySubMessage="Intenta seleccionar otro estado o verifica la disponibilidad."
			listTitle={selectedFloor ? `Enlaces de red en ${selectedFloor}` : 'Enlaces de red'}
			listAriaLabel={`Lista de enlaces de red en ${
				selectedFloor || 'el estado seleccionado'
			}`}
			renderItem={link => <NetworkLinkItemCard link={link} />}
		/>
	)
})

NetworkSiteLinkMonitoring.displayName = 'NetworkSiteLinkMonitoring'
