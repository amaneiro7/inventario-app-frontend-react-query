import { memo, useMemo } from 'react'
import { useGetAllLocationMonitorings } from '@/core/locations/locationMonitoring/infra/hook/useGetAllLocationMonitoring'
import { LocationMonitoringStatuses } from '@/core/locations/locationMonitoring/domain/value-object/LocationMonitoringStatus'
import { Badge } from '@/components/Badge'
import Typography from '@/components/Typography'
import { DeviceListSkeleton } from './Skeleton'
import { type LocationMonitoringFilters } from '@/core/locations/locationMonitoring/application/createLocationMonitoringQueryParams'

export const DeviceSelectedList = memo(({ selectedState }: { selectedState: string | null }) => {
	const query: LocationMonitoringFilters = useMemo(() => {
		return selectedState ? { stateName: selectedState } : {}
	}, [selectedState])

	const { locationMonitorings, isLoading } = useGetAllLocationMonitorings(query)
	// Show skeleton while loading or if data is not yet available
	if (isLoading || !locationMonitorings) {
		return <DeviceListSkeleton />
	}

	// Handle case where no data is found after loading
	if (!locationMonitorings.data || locationMonitorings.data.length === 0) {
		return (
			<div className="space-y-2 p-4 text-center text-gray-500">
				<Typography variant="p" weight="medium" option="small">
					No se encontraron equipos en {selectedState || 'el estado seleccionado'}.
				</Typography>
			</div>
		)
	}

	return (
		<div className="space-y-2">
			<Typography variant="p" weight="medium" option="small">
				Equipos en {selectedState}:
			</Typography>
			<div className="min-h-full space-y-1 overflow-y-auto pr-2">
				{locationMonitorings.data
					.sort((a, b) => a.status.localeCompare(b.status))
					.map(device => (
						<div
							key={device.id}
							className="flex items-center justify-between rounded border p-2 text-xs"
						>
							<span className="truncate">{device.name}</span>
							<Badge
								variant={
									device.status === LocationMonitoringStatuses.ONLINE
										? 'verde'
										: device.status === LocationMonitoringStatuses.OFFLINE
											? 'rojo'
											: 'outline'
								}
								className="text-xs"
							>
								{device.status === LocationMonitoringStatuses.ONLINE
									? 'Activo'
									: device.status === LocationMonitoringStatuses.OFFLINE
										? 'Inactivo'
										: 'N/A'}
							</Badge>
						</div>
					))}
			</div>
		</div>
	)
})

DeviceSelectedList.displayName = 'DeviceSelectedList'
