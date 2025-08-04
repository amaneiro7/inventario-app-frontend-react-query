import { CheckCircle, Clock, Construction, Hammer, XCircle } from 'lucide-react'
import { LocationStatusByName } from '@/entities/locations/locationStatus/domain/entity/LocationStatusOptionsByName'

// Configuration for status visual mapping
export const LOCATION_STATUS_CONFIG: Record<
	LocationStatusByName,
	{
		colorClass: string // Tailwind classes for background and border
		textColorClass: string // Tailwind class for text color
		icon: React.ElementType // Lucide React icon component
		displayName: string // User-friendly name
	}
> = {
	[LocationStatusByName.OPERATIONAL]: {
		colorClass: 'border-azul',
		textColorClass: 'text-verde-700',
		icon: CheckCircle,
		displayName: 'Operativa'
	},
	[LocationStatusByName.TEMPORARILY_CLOSED]: {
		colorClass: 'bg-amarillo-50 border-amarillo-300',
		textColorClass: 'text-amarillo-700',
		icon: Clock,
		displayName: 'Cerrada Temporalmente'
	},
	[LocationStatusByName.CLOSED_PERMANENTLY]: {
		colorClass: 'bg-rojo-50 border-rojo-300',
		textColorClass: 'text-rojo-700',
		icon: XCircle,
		displayName: 'Cerrada Permanentemente'
	},
	[LocationStatusByName.PLANNED_CLOSURE]: {
		colorClass: 'bg-naranja-50 border-naranja-300',
		textColorClass: 'text-naranja-700',
		icon: Hammer,
		displayName: 'Cierre Planificado'
	},
	[LocationStatusByName.UNDER_CONSTRUCTION]: {
		colorClass: 'bg-blue-50 border-blue-300',
		textColorClass: 'text-blue-700',
		icon: Construction,
		displayName: 'En Construcción'
	}
	// Fallback for any status not explicitly defined
	// You might want to add a default case if your API can return other status strings
	// For example, if you have a 'Not Available' status, you might want a gray color.
	// [key: string]: { colorClass: string; textColorClass: string; icon: React.ElementType; displayName: string; }
}
