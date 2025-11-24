import { type Permission } from '@/shared/config/permissions'
import { type IconName } from '@/shared/ui/icon/Icon'

/**
 * Define la estructura de metadatos de las rutas.
 */
export interface RouterMetadata {
	title: string
	description: string
	permission?: Permission
	pathSegment?: string
	iconName?: IconName
}
