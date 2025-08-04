import { memo, useMemo } from 'react'
import { MapPin } from 'lucide-react'
import { TypeOfSiteOptions } from '@/entities/locations/typeOfSites/domain/entity/TypeOfSiteOptions'
import { LocationMonitoringStatuses } from '@/entities/locations/locationMonitoring/domain/value-object/LocationMonitoringStatus'
import { Badge } from '@/shared/ui/Badge'
import Typography from '@/shared/ui/Typography'
import {
	type GenericMonitorableItem,
	GenericMonitoringList
} from '../../../../shared/ui/GenericMonitoringList'
import { type LocationMonitoringFilters } from '@/entities/locations/locationMonitoring/application/createLocationMonitoringQueryParams'
import { useGetAllLocationMonitorings } from '@/entities/locations/locationMonitoring/infra/hook/useGetAllLocationMonitoring'

interface NetworkLinkSelectedListProps {
	selectedState: string | null
}

export const NetworkStateLinkMonitoring = memo(
	({ selectedState }: NetworkLinkSelectedListProps) => {
		const query: LocationMonitoringFilters = useMemo(
			() => ({
				...(selectedState ? { stateName: selectedState } : {}),
				typeOfSiteId: TypeOfSiteOptions.AGENCY
			}),
			[selectedState]
		)

		const { locationMonitorings, isLoading } = useGetAllLocationMonitorings(query)

		const networkLinks: GenericMonitorableItem[] = useMemo(() => {
			if (!locationMonitorings?.data) return []
			return locationMonitorings.data
				.map(data => ({
					id: data.id,
					name: data.name,
					status: data.status,
					subDetail: data.subnet
				}))
				.sort((a, b) => {
					// Prioritize OFFLINE over ONLINE, then sort by name
					if (
						a.status === LocationMonitoringStatuses.ONLINE &&
						b.status === LocationMonitoringStatuses.OFFLINE
					) {
						return 1 // a comes before b
					}
					if (
						a.status === LocationMonitoringStatuses.OFFLINE &&
						b.status === LocationMonitoringStatuses.ONLINE
					) {
						return -1 // b comes before a
					}
					// If statuses are the same, sort by computerName
					return a.name.localeCompare(b.name)
				})
		}, [locationMonitorings])

		// This function defines how each DeviceMonitoringDto item should be rendered
		const renderNetworkLinkItem = (link: GenericMonitorableItem) => {
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
				<>
					<div className="flex min-w-0 flex-1 items-center gap-1 truncate">
						<MapPin
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
								{link.name}
							</span>
							<span className="mt-0.5 text-xs leading-none text-gray-500">
								{link.subDetail}
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
				</>
			)
		}

		return (
			<GenericMonitoringList
				items={networkLinks}
				isLoading={isLoading}
				emptyMessage={`No se encontraron enlaces de red en ${selectedState ?? 'el estado seleccionado'}.`}
				emptySubMessage="Intenta seleccionar otro estado o verifica la disponibilidad."
				listTitle={selectedState ? `Enlaces de red en ${selectedState}` : 'Enlaces de red'}
				listAriaLabel={`Lista de enlaces de red en ${selectedState || 'el estado seleccionado'}`}
				renderItem={renderNetworkLinkItem}
				// If you have a specific skeleton for this type, you could pass it here:
				// LoadingSkeleton={NetworkLinkListSkeleton} // It's the default anyway
			/>
		)
	}
)

NetworkStateLinkMonitoring.displayName = 'NetworkStateLinkMonitoring'
