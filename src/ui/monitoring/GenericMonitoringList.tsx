import Typography from '@/shared/ui/Typography'
import { NetworkLinkListSkeleton } from './NetworkLinkListSkeleton'

// A generic interface for any item that can be displayed in this list.
// The actual DTOs (e.g., DeviceMonitoringDto, LocationMonitoringDto) should implement this.
export interface GenericMonitorableItem {
	id: string // Unique identifier for the list key
	name: string // Main name to display (e.g., computerName, locationName)
	status: string // The raw status string (e.g., "ONLINE", "OFFLINE")
	subDetail: string | null // Optional: for IP Address or any other secondary detail
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

export function GenericMonitoringList<T extends GenericMonitorableItem>({
	items,
	isLoading,
	emptyMessage,
	emptySubMessage,
	listTitle,
	listAriaLabel,
	renderItem,
	LoadingSkeleton = NetworkLinkListSkeleton // Default skeleton
}: GenericMonitoringListProps<T>) {
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
					<Typography variant="p" option="tiny" color="gray-600">
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
