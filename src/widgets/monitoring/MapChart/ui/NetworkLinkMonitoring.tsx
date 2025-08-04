import { memo, useMemo } from 'react'
import { MapPin } from 'lucide-react'
import { useGetAllLocationMonitorings } from '@/entities/locations/locationMonitoring/infra/hook/useGetAllLocationMonitoring'
import { LocationMonitoringStatuses } from '@/entities/locations/locationMonitoring/domain/value-object/LocationMonitoringStatus'
import { Badge } from '@/shared/ui/Badge'
import Typography from '@/shared/ui/Typography'
import { NetworkLinkListSkeleton } from '../../../../shared/ui/skeletons/NetworkLinkListSkeleton'
import { TypeOfSiteOptions } from '@/entities/locations/typeOfSites/domain/entity/TypeOfSiteOptions'
import { type LocationMonitoringFilters } from '@/entities/locations/locationMonitoring/application/createLocationMonitoringQueryParams'
import { type LocationMonitoringDto } from '@/entities/locations/locationMonitoring/domain/dto/LocationMonitoring.dto'

interface NetworkLinkSelectedListProps {
	selectedState: string | null
}

export const NetworkLinkMonitoring = memo(({ selectedState }: NetworkLinkSelectedListProps) => {
	const query: LocationMonitoringFilters = useMemo(
		() => ({
			...(selectedState ? { stateName: selectedState } : {}),
			typeOfSiteId: TypeOfSiteOptions.AGENCY
		}),
		[selectedState]
	)

	const { locationMonitorings, isLoading } = useGetAllLocationMonitorings(query)

	if (isLoading) {
		return (
			<div role="status" aria-label="Cargando lista de enlaces de red">
				<NetworkLinkListSkeleton />
			</div>
		)
	}

	const networkLinks: LocationMonitoringDto[] = locationMonitorings?.data || []

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
						{selectedState || 'el estado seleccionado'}
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
				Enlaces de red en <span className="font-semibold">{selectedState}</span>:
			</Typography>
			<ul
				className="h-full min-h-0 flex-1 space-y-1 overflow-auto overflow-y-auto pr-2"
				role="list"
				aria-label={`Lista de enlaces de red en ${selectedState || 'el estado seleccionado'}`}
			>
				{networkLinks
					.sort((a, b) => a.status.localeCompare(b.status))
					.map(link => {
						const statusValue =
							link.status === LocationMonitoringStatuses.ONLINE
								? 'Activo'
								: link.status === LocationMonitoringStatuses.OFFLINE
									? 'Inactivo'
									: 'N/A'

						const statusColor =
							link.status === LocationMonitoringStatuses.ONLINE
								? 'verde'
								: link.status === LocationMonitoringStatuses.OFFLINE
									? 'rojo'
									: 'outline'

						return (
							<li
								key={link.id}
								className="flex items-center justify-between gap-3 rounded border bg-white p-2 shadow-sm"
								role="listitem"
								aria-label={`${link.name}, estado: ${statusValue}`}
							>
								<div className="flex min-w-0 flex-1 items-center gap-1 truncate">
									<MapPin
										className="h-6 w-6 flex-shrink-0 text-gray-500"
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
											{link.name}
										</span>
										<span className="mt-0.5 text-xs leading-none text-gray-500">
											{link.subnet}
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
