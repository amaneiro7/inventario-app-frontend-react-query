import { memo, useMemo } from 'react'
import { useGetAllDeviceMonitorings } from '@/core/devices/deviceMonitoring/infra/hook/useGetAllDeviceMonitoring'
import { DeviceMonitoringStatuses } from '@/core/devices/deviceMonitoring/domain/value-object/DeviceMonitoringStatus'
import { TypeOfSiteOptions } from '@/core/locations/typeOfSites/domain/entity/TypeOfSiteOptions'
import { Badge } from '@/components/Badge'
import Typography from '@/components/Typography'
import { NetworkLinkListSkeleton } from './NetworkLinkListSkeleton'
import { type DeviceMonitoringFilters } from '@/core/devices/deviceMonitoring/application/createDeviceMonitoringQueryParams'
import { type DeviceMonitoringDto } from '@/core/devices/deviceMonitoring/domain/dto/DeviceMonitoring.dto'

interface GenericMonitorableItem {
	id: string
	name: string
	status: string
	subDetail?: string
}

interface GenericMonitoringListProps<T extends GenericMonitorableItem> {
	/** The array of items to display in the list. */
	items: T[]
	/** Whether the data is currently loading. */
	isLoading: boolean
	/** Message to display when the list is empty. */
	emptyMessage: string
	/** Optional detailed message for empty state. */
	emptySubMessage?: string
	/** Optional title to display above the list. */
	listTitle?: string
	/** ARIA label for the main list element. */
	listAriaLabel: string
	/** A function that takes an item and returns the JSX to render for that item. */
	renderItem: (item: T) => React.ReactNode
	/** Optional component to render as a skeleton when loading. Defaults to NetworkLinkListSkeleton. */
	LoadingSkeleton?: React.ComponentType | React.ElementType // Could be a function component or element
}

export const GenericMonitoringList = memo(
	<T extends GenericMonitorableItem>({
		items,
		isLoading,
		emptyMessage,
		emptySubMessage,
		listTitle,
		listAriaLabel,
		renderItem,
		LoadingSkeleton = NetworkLinkListSkeleton // Default skeleton
	}: GenericMonitoringListProps<T>) => {
		if (isLoading) {
			return (
				<div role="status" aria-label="Cargando lista de enlaces de red">
					<NetworkLinkListSkeleton />
				</div>
			)
		}

		if (items.length === 0) {
			return (
				<div
					className="space-y-2 rounded-md border border-gray-300 bg-gray-50 p-4 text-center text-balance"
					role="status"
					aria-live="polite"
					aria-atomic="true"
				>
					<Typography variant="p" weight="semibold" option="small" color="gray-600">
						{emptyMessage}
					</Typography>
					{emptyMessage && (
						<Typography variant="p" option="tiny" color="gris">
							{emptySubMessage}
						</Typography>
					)}
				</div>
			)
		}

		return (
			<>
				<Typography variant="p" weight="medium" option="small" className="mb-2">
					{listTitle}
				</Typography>
				<ul
					className="h-full min-h-0 flex-1 space-y-1 overflow-auto overflow-y-auto pr-2"
					role="list"
					aria-label={}
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
	}
)

import { memo, useMemo } from 'react'
import { Server } from 'lucide-react' // This icon might need to be passed as a prop for true generality
import { Badge } from '@/components/Badge'
import Typography from '@/components/Typography'
import { NetworkLinkListSkeleton } from './NetworkLinkListSkeleton' // This skeleton might also need to be generic or a prop

// Assuming these status enums exist and are consistent across different types of monitoring
import { DeviceMonitoringStatuses } from '@/core/devices/deviceMonitoring/domain/value-object/DeviceMonitoringStatus'
// import { LocationMonitoringStatuses } from '@/core/locations/locationMonitoring/domain/valueObject/LocationMonitoringStatus'; // Example for location statuses

// A generic interface for any item that can be displayed in this list.
// The actual DTOs (e.g., DeviceMonitoringDto, LocationMonitoringDto) should implement this.
export interface GenericMonitorableItem {
	id: string // Unique identifier for the list key
	name: string // Main name to display (e.g., computerName, locationName)
	status: string // The raw status string (e.g., "ONLINE", "OFFLINE")
	subDetail?: string // Optional: for IP Address or any other secondary detail
	// Add any other properties your `renderItem` function might need
}

interface GenericMonitoringListProps<T extends GenericMonitorableItem> {
	/** The array of items to display in the list. */
	items: T[]
	/** Whether the data is currently loading. */
	isLoading: boolean
	/** Message to display when the list is empty. */
	emptyMessage: string
	/** Optional detailed message for empty state. */
	emptySubMessage?: string
	/** Optional title to display above the list. */
	listTitle?: string
	/** ARIA label for the main list element. */
	listAriaLabel: string
	/** A function that takes an item and returns the JSX to render for that item. */
	renderItem: (item: T) => React.ReactNode
	/** Optional component to render as a skeleton when loading. Defaults to NetworkLinkListSkeleton. */
	LoadingSkeleton?: React.ComponentType | React.ElementType // Could be a function component or element
}

export const GenericMonitoringList = memo(
	<T extends GenericMonitorableItem>({
		items,
		isLoading,
		emptyMessage,
		emptySubMessage,
		listTitle,
		listAriaLabel,
		renderItem,
		LoadingSkeleton = NetworkLinkListSkeleton // Default skeleton
	}: GenericMonitoringListProps<T>) => {
		if (isLoading) {
			return (
				<div role="status" aria-label="Cargando lista de elementos monitoreados">
					<LoadingSkeleton />
				</div>
			)
		}

		if (items.length === 0) {
			return (
				<div
					className="space-y-2 rounded-lg border border-gray-300 bg-gray-50 p-4 text-center shadow-sm" // Enhanced styling
					role="status"
					aria-live="polite"
					aria-atomic="true"
				>
					<Typography
						variant="p"
						weight="medium"
						option="small"
						className="font-semibold text-gray-700" // Adjusted color
					>
						{emptyMessage}
					</Typography>
					{emptySubMessage && (
						<Typography variant="p" option="tiny" color="gray-500">
							{' '}
							{/* Adjusted color */}
							{emptySubMessage}
						</Typography>
					)}
				</div>
			)
		}

		return (
			<>
				{listTitle && (
					<Typography
						variant="p"
						weight="medium"
						option="small"
						className="mb-3 text-gray-700"
					>
						{' '}
						{/* Adjusted margin and color */}
						{listTitle}
					</Typography>
				)}
				<ul
					className="h-full min-h-0 flex-1 space-y-2 overflow-auto overflow-y-auto pr-2" // Increased space-y, added scrollbar padding
					role="list"
					aria-label={listAriaLabel}
				>
					{/* Items are passed already filtered and potentially sorted from the parent */}
					{items.map(item => (
						<li
							key={item.id} // Ensure 'id' is always present in T
							className="flex items-center justify-between gap-3 rounded-md border bg-white p-3 shadow-sm transition-shadow duration-200 hover:shadow-md" // Enhanced styling
							role="listitem"
							aria-label={`${item.name}, estado: ${item.status}`} // Basic ARIA label, can be refined by renderItem if needed
						>
							{renderItem(item)}
						</li>
					))}
				</ul>
			</>
		)
	}
)

GenericMonitoringList.displayName = 'GenericMonitoringList'

NetworkLinkMonitoring.displayName = 'NetworkLinkMonitoring '

import { memo, useMemo } from 'react'
import { Server } from 'lucide-react'
import { useGetAllDeviceMonitorings } from '@/core/devices/deviceMonitoring/infra/hook/useGetAllDeviceMonitoring'
import { DeviceMonitoringStatuses } from '@/core/devices/deviceMonitoring/domain/value-object/DeviceMonitoringStatus'
import { TypeOfSiteOptions } from '@/core/locations/typeOfSites/domain/entity/TypeOfSiteOptions'
import { Badge } from '@/components/Badge'
import Typography from '@/components/Typography'
import { type DeviceMonitoringFilters } from '@/core/devices/deviceMonitoring/application/createDeviceMonitoringQueryParams'
import { type DeviceMonitoringDto } from '@/core/devices/deviceMonitoring/domain/dto/DeviceMonitoring.dto'

// Import the new generic component and its base interface
import { GenericMonitoringList, type GenericMonitorableItem } from './GenericMonitoringList'

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
