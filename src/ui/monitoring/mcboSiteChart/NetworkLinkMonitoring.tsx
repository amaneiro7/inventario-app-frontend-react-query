import { memo, useMemo } from 'react'
import { Server } from 'lucide-react'
import { useGetAllDeviceMonitorings } from '@/core/devices/deviceMonitoring/infra/hook/useGetAllDeviceMonitoring'
import { DeviceMonitoringStatuses } from '@/core/devices/deviceMonitoring/domain/value-object/DeviceMonitoringStatus'
import { TypeOfSiteOptions } from '@/core/locations/typeOfSites/domain/entity/TypeOfSiteOptions'
import { Badge } from '@/components/Badge'
import Typography from '@/components/Typography'
import { GenericMonitoringList } from '../NetworkLinkMonitoring'
import { type DeviceMonitoringFilters } from '@/core/devices/deviceMonitoring/application/createDeviceMonitoringQueryParams'
import { type DeviceMonitoringDto } from '@/core/devices/deviceMonitoring/domain/dto/DeviceMonitoring.dto'

// Import the new generic component and its base interface

// Ensure DeviceMonitoringDto implements GenericMonitorableItem for type compatibility
// You might need to adjust DeviceMonitoringDto if it doesn't already have 'id', 'name', 'status'
// For this example, let's assume DeviceMonitoringDto looks something like:
/*
interface DeviceMonitoringDto {
    id: string;
    computerName: string; // This will map to `name`
    status: DeviceMonitoringStatuses; // This will map to `status`
    ipAddress: string; // This will map to `subDetail`
    // ... other properties
}
*/

interface NetworkLinkSelectedListProps {
	selectedFloor: string | null
}

export const NetworkLinkMonitoring = memo(({ selectedFloor }: NetworkLinkSelectedListProps) => {
	const query: DeviceMonitoringFilters = useMemo(
		() => ({
			...(selectedFloor ? { locationName: selectedFloor } : {}),
			typeOfSiteId: TypeOfSiteOptions.ADMINISTRATIVE
		}),
		[selectedFloor]
	)

	const { deviceMonitorings, isLoading } = useGetAllDeviceMonitorings(query)

	// Prepare data for the generic component
	// Important: Sort the data here, before passing it to the generic list.
	// This maintains the generic component's focus on rendering, not sorting/filtering.
	const networkLinks: DeviceMonitoringDto[] = useMemo(() => {
		if (!deviceMonitorings?.data) return []
		return deviceMonitorings.data.sort((a, b) => {
			// Prioritize ONLINE over OFFLINE, then sort by name
			if (
				a.status === DeviceMonitoringStatuses.ONLINE &&
				b.status === DeviceMonitoringStatuses.OFFLINE
			) {
				return -1 // a comes before b
			}
			if (
				a.status === DeviceMonitoringStatuses.OFFLINE &&
				b.status === DeviceMonitoringStatuses.ONLINE
			) {
				return 1 // b comes before a
			}
			// If statuses are the same, sort by computerName
			return a.computerName.localeCompare(b.computerName)
		})
	}, [deviceMonitorings])

	// This function defines how each DeviceMonitoringDto item should be rendered
	const renderNetworkLinkItem = (link: DeviceMonitoringDto) => {
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
						<span className="leading-tight font-bold text-gray-900">
							{link.computerName}
						</span>
						<span className="mt-0.5 text-xs leading-none text-gray-500">
							{link.ipAddress}
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
		<GenericMonitoringList<DeviceMonitoringDto>
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

NetworkLinkMonitoring.displayName = 'NetworkLinkMonitoring'
