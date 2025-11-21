/**
 * Single source of truth for all permissions in the system.
 * Using `as const` allows TypeScript to infer the exact string literal types,
 * enabling type safety and autocompletion.
 */
export const PERMISSIONS = {
	ACCESS_POLICIES: {
		READ: 'access-policies:read',
		READ_LIST: 'access-policies:read-list',
		CREATE: 'access-policies:create',
		UPDATE: 'access-policies:update',
		DELETE: 'access-policies:delete',
		ASSIGN: 'access-policies:assign',
		UNASSIGN: 'access-policies:unassign'
	},
	PERMISSION_GROUPS: {
		CREATE: 'permission-groups:create',
		READ: 'permission-groups:read',
		READ_LIST: 'permission-groups:read-list',
		UPDATE: 'permission-groups:update',
		DELETE: 'permission-groups:delete'
	},
	PERMISSIONS: {
		CREATE: 'permissions:create',
		READ_LIST: 'permissions:read-list',
		READ: 'permissions:read',
		DELETE: 'permissions:delete'
	},
	BRANDS: {
		CREATE: 'brands:create',
		READ_LIST: 'brands:read-list',
		READ: 'brands:read',
		UPDATE: 'brands:update'
	},
	MAIN_CATEGORIES: {
		READ_LIST: 'main-categories:read-list',
		READ: 'main-categories:read'
	},
	CATEGORIES: {
		READ_LIST: 'categories:read-list',
		READ: 'categories:read'
	},
	DASHBOARD: {
		READ: 'dashboard:read'
	},
	DEVICES: {
		READ_LIST: 'devices:read-list',
		READ_PING_STATUS: 'devices:read-ping-status',
		DOWNLOAD: 'devices:download',
		READ_MONITORING_DASHBOARD: 'devices:read-monitoring-dashboard',
		READ_MONITORING_BY_STATE_DASHBOARD: 'devices:read-monitoring-by-state-dashboard',
		READ_MONITORING_BY_LOCATION_DASHBOARD: 'devices:read-monitoring-by-location-dashboard',
		READ: 'devices:read',
		CREATE: 'devices:create',
		UPDATE: 'devices:update',
		DELETE: 'devices:delete'
	},
	EMPLOYEES: {
		READ_LIST: 'employees:read-list',
		READ: 'employees:read',
		DOWNLOAD: 'employees:download',
		CREATE: 'employees:create',
		UPDATE: 'employees:update',
		DELETE: 'employees:delete'
	},
	CARGOS: {
		READ_LIST: 'cargos:read-list',
		READ: 'cargos:read',
		CREATE: 'cargos:create',
		UPDATE: 'cargos:update'
	},
	DEPARTAMENTOS: {
		READ_LIST: 'departamentos:read-list',
		READ: 'departamentos:read',
		CREATE: 'departamentos:create',
		UPDATE: 'departamentos:update'
	},
	DIRECTIVAS: {
		READ_LIST: 'directivas:read-list',
		READ: 'directivas:read',
		CREATE: 'directivas:create',
		UPDATE: 'directivas:update'
	},
	VICEPRESIDENCIA_EJECUTIVAS: {
		READ_LIST: 'vicepresidencia-ejecutivas:read-list',
		READ: 'vicepresidencia-ejecutivas:read',
		CREATE: 'vicepresidencia-ejecutivas:create',
		UPDATE: 'vicepresidencia-ejecutivas:update'
	},
	VICEPRESIDENCIAS: {
		READ_LIST: 'vicepresidencias:read-list',
		READ: 'vicepresidencias:read',
		CREATE: 'vicepresidencias:create',
		UPDATE: 'vicepresidencias:update'
	},
	MEMORY_RAM_TYPES: {
		READ_LIST: 'memory-ram-types:read-list',
		READ: 'memory-ram-types:read'
	},
	HARDDRIVECAPACITIES: {
		READ_LIST: 'operating-systems:read-list',
		READ: 'operating-systems:read'
	},
	HARDDRIVETYPES: {
		READ_LIST: 'hard-drive-types:read-list',
		READ: 'hard-drive-types:read'
	},
	OPERATING_SYSTEM: {
		READ_LIST: 'hard-drive-capacities:read-list',
		READ: 'hard-drive-capacities:read'
	},
	OPERATING_SYSTEM_ARQ: {
		READ_LIST: 'operating-system-arqs:read-list',
		READ: 'operating-system-arqs:read'
	},
	INPUT_TYPE: {
		READ_LIST: 'input-type:read-list',
		READ: 'input-type:read'
	},
	MODELS: {
		READ_LIST: 'models:read-list',
		READ: 'models:read',
		DOWNLOAD: 'models:download',
		CREATE: 'models:create',
		UPDATE: 'models:update'
	},
	PROCESSORS: {
		READ_LIST: 'processors:read-list',
		READ: 'processors:read',
		CREATE: 'processors:create',
		UPDATE: 'processors:update',
		DELETE: 'processors:delete'
	},
	HISTORY: {
		READ_LIST: 'history:read-list',
		READ_DASHBOARD: 'history:read-dashboard'
	},
	LOCATIONS: {
		READ_LIST: 'locations:read-list',
		READ_PING_STATUS: 'locations:read-ping-status',
		READ_MONITORING_DASHBOARD: 'locations:read-monitoring-dashboard',
		READ_MONITORING_BY_STATE_DASHBOARD: 'locations:read-monitoring-by-state-dashboard',
		READ_MONITORING_BY_LOCATION_DASHBOARD: 'locations:read-monitoring-by-location-dashboard',
		READ: 'locations:read',
		CREATE: 'locations:create',
		UPDATE: 'locations:update'
	},
	ADMINISTRATIVE_REGIONS: {
		READ_LIST: 'administrative-regions:read-list'
	},
	CITIES: {
		READ_LIST: 'cities:read-list',
		READ: 'cities:read',
		CREATE: 'cities:create',
		UPDATE: 'cities:update'
	},
	REGIONS: {
		READ_LIST: 'regions:read-list',
		READ: 'regions:read',
		UPDATE: 'regions:update'
	},
	STATES: {
		READ_LIST: 'states:read-list'
	},
	SITES: {
		READ_LIST: 'sites:read-list',
		READ: 'sites:read',
		CREATE: 'sites:create',
		UPDATE: 'sites:update'
	},
	SHIPMENTS: {
		READ_LIST: 'shipments:read-list',
		READ: 'shipments:read',
		CREATE: 'shipments:create',
		UPDATE: 'shipments:update'
	},
	LOCATION_STATUS: {
		READ_LIST: 'operational-status:read-list'
	},
	TYPE_OF_SITES: {
		READ_LIST: 'type-of-sites:read-list'
	},

	SETTINGS: {
		READ_LIST: 'settings:read-list',
		READ: 'settings:read',
		CREATE: 'settings:create',
		UPDATE: 'settings:update',
		READ_ALLOWED_DOMAINS: 'settings:read-allowed-domains'
	},
	STATUS: {
		READ_LIST: 'status:read-list',
		READ_DASHBOARD: 'status:read-dashboard'
	},
	USERS: {
		READ_LIST: 'users:read-list',
		READ: 'users:read',
		CREATE: 'users:create',
		UPDATE: 'users:update',
		RESET_PASSWORD: 'users:reset-password',
		UNLOCK: 'users:unlock',
		DISABLE: 'users:disable',
		REACTIVATE: 'users:reactivate'
	},
	ROLES: {
		READ_LIST: 'roles:read-list'
	}
	// ... y así sucesivamente para todos los demás permisos.
} as const

// --- Tipos Derivados ---

// 1. Tipo que representa la estructura completa del objeto PERMISSIONS
type PermissionsObject = typeof PERMISSIONS

// 2. Mapeo de tipos para aplanar la estructura y extraer todos los valores
//    Esto crea un tipo temporal donde cada clave superior (ej. ACCESS_POLICIES)
//    contiene la unión de sus respectivos permisos (ej. 'access-policies:read' | ...)
type FlattenedPermissions = {
	[K in keyof PermissionsObject]: PermissionsObject[K][keyof PermissionsObject[K]]
}

// 3. Extracción de la unión de todos los valores del tipo aplanado.
//    Este es el tipo de unión de todas las cadenas de permisos posibles.
//    Ejemplo: 'access-policies:read' | 'permission-groups:create' | 'users:read' | ...
export type Permission = FlattenedPermissions[keyof FlattenedPermissions]
