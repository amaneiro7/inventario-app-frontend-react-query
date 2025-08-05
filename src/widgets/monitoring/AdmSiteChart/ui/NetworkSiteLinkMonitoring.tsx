import { memo, useMemo } from 'react'
import { Server } from 'lucide-react'
import { useGetAllDeviceMonitorings } from '@/entities/devices/deviceMonitoring/infra/hook/useGetAllDeviceMonitoring'
import { DeviceMonitoringStatuses } from '@/entities/devices/deviceMonitoring/domain/value-object/Status'
import { TypeOfSiteOptions } from '@/entities/locations/typeOfSites/domain/entity/TypeOfSiteOptions'
import { Badge } from '@/shared/ui/Badge'
import Typography from '@/shared/ui/Typography'
import {
	type GenericMonitorableItem,
	GenericMonitoringList
} from '../../../../shared/ui/GenericMonitoringList'
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

	const networkLinks: GenericMonitorableItem[] = useMemo(() => {
		if (!deviceMonitorings?.data) return []
		return deviceMonitorings.data
			.map(data => ({
				id: data.id,
				name: data.computerName,
				status: data.status,
				subDetail: data.ipAddress
			}))
			.sort((a, b) => {
				// Prioritize OFFLINE over ONLINE, then sort by name
				if (
					a.status === DeviceMonitoringStatuses.ONLINE &&
					b.status === DeviceMonitoringStatuses.OFFLINE
				) {
					return 1 // a comes before b
				}
				if (
					a.status === DeviceMonitoringStatuses.OFFLINE &&
					b.status === DeviceMonitoringStatuses.ONLINE
				) {
					return -1 // b comes before a
				}
				// If statuses are the same, sort by computerName
				return a.name.localeCompare(b.name)
			})
	}, [deviceMonitorings])

	// This function defines how each DeviceMonitoringDto item should be rendered
	const renderNetworkLinkItem = (link: GenericMonitorableItem) => {
		const statusValue =
			link.status === DeviceMonitoringStatuses.ONLINE
				? 'Activo'
				: link.status === DeviceMonitoringStatuses.OFFLINE
					? 'Inactivo'
					: 'N/A'

		const statusColor =
			link.status === DeviceMonitoringStatuses.ONLINE
				? 'verde'
				: link.status === DeviceMonitoringStatuses.OFFLINE
					? 'rojo'
					: 'outline'

		return (
			<>
				<div className="flex min-w-0 flex-1 items-center gap-1 truncate">
					<Server className="h-5 w-5 flex-shrink-0 text-gray-500" aria-hidden="true" />
					<Typography
						variant="span"
						option="tiny"
						className="flex flex-col truncate"
						color="gray-600"
						weight="medium"
					>
						<span className="leading-tight font-bold text-gray-900">{link.name}</span>
						<span className="mt-0.5 text-xs leading-none text-gray-500">
							{link.subDetail}
						</span>
					</Typography>
				</div>
				<Badge variant={statusColor} role="status" aria-label={`Estado: ${statusValue}`}>
					{statusValue}
				</Badge>
			</>
		)
	}

	return (
		<GenericMonitoringList
			items={networkLinks}
			isLoading={isLoading}
			emptyMessage={`No se encontraron enlaces de red en ${selectedFloor ?? 'el estado seleccionado'}.`}
			emptySubMessage="Intenta seleccionar otro estado o verifica la disponibilidad."
			listTitle={selectedFloor ? `Enlaces de red en ${selectedFloor}` : 'Enlaces de red'}
			listAriaLabel={`Lista de enlaces de red en ${selectedFloor || 'el estado seleccionado'}`}
			renderItem={renderNetworkLinkItem}
			// If you have a specific skeleton for this type, you could pass it here:
			// LoadingSkeleton={NetworkLinkListSkeleton} // It's the default anyway
		/>
	)
})

NetworkSiteLinkMonitoring.displayName = 'NetworkSiteLinkMonitoring'
