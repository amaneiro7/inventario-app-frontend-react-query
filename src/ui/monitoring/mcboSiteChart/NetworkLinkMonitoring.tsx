import { memo, useMemo } from 'react'
import { Server } from 'lucide-react'
import { useGetAllDeviceMonitorings } from '@/core/devices/deviceMonitoring/infra/hook/useGetAllDeviceMonitoring'
import { DeviceMonitoringStatuses } from '@/core/devices/deviceMonitoring/domain/value-object/DeviceMonitoringStatus'
import { TypeOfSiteOptions } from '@/core/locations/typeOfSites/domain/entity/TypeOfSiteOptions'
import { Badge } from '@/components/Badge'
import Typography from '@/components/Typography'
import { NetworkLinkListSkeleton } from '../NetworkLinkListSkeleton'
import { type DeviceMonitoringFilters } from '@/core/devices/deviceMonitoring/application/createDeviceMonitoringQueryParams'
import { type DeviceMonitoringDto } from '@/core/devices/deviceMonitoring/domain/dto/DeviceMonitoring.dto'

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

	if (isLoading) {
		return (
			<div role="status" aria-label="Cargando lista de enlaces de red">
				<NetworkLinkListSkeleton />
			</div>
		)
	}

	const networkLinks: DeviceMonitoringDto[] = deviceMonitorings?.data ?? []

	if (networkLinks.length === 0) {
		return (
			<div
				className="space-y-2 rounded-md border border-gray-300 bg-gray-50 p-4 text-center text-balance"
				role="status"
				aria-live="polite"
				aria-atomic="true"
			>
				<Typography
					variant="p"
					weight="medium"
					option="small"
					className="font-semibold"
					color="gray-600"
				>
					No se encontraron enlaces de red en {''}
					<span className="font-semibold">
						{selectedFloor ?? 'el estado seleccionado'}
					</span>
					.
				</Typography>
				<Typography variant="p" option="tiny" color="gris">
					Intenta seleccionar otro estado o verifica la disponibilidad.
				</Typography>
			</div>
		)
	}

	return (
		<>
			<Typography variant="p" weight="medium" option="small" className="mb-2">
				Enlaces de red en <span className="font-semibold">{selectedFloor}</span>:
			</Typography>
			<ul
				className="h-full min-h-0 flex-1 space-y-1 overflow-auto overflow-y-auto pr-2"
				role="list"
				aria-label={`Lista de enlaces de red en ${selectedFloor || 'el estado seleccionado'}`}
			>
				{networkLinks
					.sort((a, b) => a.status.localeCompare(b.status))
					.map(link => {
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
							<li
								key={link.id}
								className="flex items-center justify-between gap-3 rounded border bg-white p-2 shadow-sm"
								role="listitem"
								aria-label={`${link.computerName}, estado: ${statusValue}`}
							>
								<div className="flex min-w-0 flex-1 items-center gap-1 truncate">
									<Server
										className="h-5 w-5 flex-shrink-0 text-gray-500"
										aria-hidden="true"
									/>
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

								<Badge
									variant={statusColor}
									role="status"
									aria-label={`Estado: ${statusValue}`}
								>
									{statusValue}
								</Badge>
							</li>
						)
					})}
			</ul>
		</>
	)
})

NetworkLinkMonitoring.displayName = 'NetworkLinkMonitoring '
