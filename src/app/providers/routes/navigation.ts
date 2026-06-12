import { PERMISSIONS, type Permission } from '@/shared/config/permissions'

interface Navigation {
	label: string
	navs: Navs[]
}

interface Navs {
	title: string
	path: string
	desc: string
	permission?: Permission
}

// Helper para no repetir objetos de navegación
const ITEMS = {
	// Dashboards & Monitoreo
	DASH_COMPUTER: {
		title: 'Dashboard de Equipos',
		path: '/dashboard/computer',
		desc: 'Métricas clave sobre los equipos de computación.',
		permission: PERMISSIONS.DASHBOARD.READ_COMPUTER_DASHBOARD
	},
	MON_LOCATION: {
		title: 'Monitoreo de Ubicaciones',
		path: '/monitoring/location',
		desc: 'Estado en tiempo real de la conectividad por ubicación.',
		permission: PERMISSIONS.LOCATIONS.READ_MONITORING_DASHBOARD
	},
	MON_DEVICE: {
		title: 'Monitoreo de Dispositivos',
		path: '/monitoring/device',
		desc: 'Estado en tiempo real de todos los dispositivos.',
		permission: PERMISSIONS.DEVICES.READ_MONITORING_DASHBOARD
	},
	MAP_AGENCY: {
		title: 'Mapa de Conectividad de Agencias',
		path: '/monitoring/agencymap',
		desc: 'Visualiza enlaces de agencias a nivel nacional.',
		permission: PERMISSIONS.LOCATIONS.READ_MONITORING_DASHBOARD
	},
	MAP_ADMIN: {
		title: 'Mapa de Conectividad de Torres',
		path: '/monitoring/administrativesitemap',
		desc: 'Estado de equipos en torres administrativas.',
		permission: PERMISSIONS.LOCATIONS.READ_MONITORING_DASHBOARD
	},
	DASH_HARDWARE: {
		title: 'Dashboard de Evaluación de Hardware',
		path: '/dashboard/evaluationhardware',
		desc: 'Reglas de migración para actualización de dispositivos.',
		permission: PERMISSIONS.DASHBOARD.READ_HARDWARE_EVALUATION_DASHBOARD
	},

	// Listas
	LIST_COMPUTER: {
		title: 'Lista de Equipos de Computación',
		path: '/list/computer',
		desc: 'Inventario completo de equipos.',
		permission: PERMISSIONS.DEVICES.READ_LIST
	},
	LIST_MONITOR: {
		title: 'Lista de Monitores',
		path: '/list/monitor',
		desc: 'Inventario de monitores.',
		permission: PERMISSIONS.DEVICES.READ_LIST
	},
	LIST_PRINTER: {
		title: 'Lista de Impresoras',
		path: '/list/printer',
		desc: 'Inventario de impresoras.',
		permission: PERMISSIONS.DEVICES.READ_LIST
	},
	LIST_FIN_PRINTER: {
		title: 'Lista de Impresoras Financieras',
		path: '/list/finantialprinter',
		desc: 'Impresoras financieras.',
		permission: PERMISSIONS.DEVICES.READ_LIST
	},
	LIST_PARTS: {
		title: 'Lista de Partes y Piezas',
		path: '/list/parts',
		desc: 'Partes de repuesto.',
		permission: PERMISSIONS.DEVICES.READ_LIST
	},
	LIST_MIGRATION: {
		title: 'Listado de Reglas de Migración',
		path: '/list/migration-rules',
		desc: 'Gestión de reglas de migración.',
		permission: PERMISSIONS.MIGRATION_RULES.READ_LIST
	},
	LIST_MODEL: {
		title: 'Listado de Modelos',
		path: '/list/model',
		desc: 'Modelos organizados por marca.',
		permission: PERMISSIONS.MODELS.READ_LIST
	},
	LIST_SHIPMENT: {
		title: 'Lista de Envíos',
		path: '/list/shipment',
		desc: 'Historial y estado de envíos.',
		permission: PERMISSIONS.SHIPMENTS.READ_LIST
	},
	LIST_USERS: {
		title: 'Listado de Usuarios',
		path: '/list/usuarios?isStillWorking=true',
		desc: 'Usuarios activos del sistema.',
		permission: PERMISSIONS.EMPLOYEES.READ_LIST
	},
	LIST_LOCATION: {
		title: 'Listado de Sitios',
		path: '/list/location',
		desc: 'Lista de ubicaciones físicas.',
		permission: PERMISSIONS.LOCATIONS.READ_LIST
	},
	LIST_HISTORY: {
		title: 'Historial de Modificaciones',
		path: '/list/history',
		desc: 'Registro detallado de cambios.',
		permission: PERMISSIONS.HISTORY.READ_LIST
	},
	LIST_ACCESS: {
		title: 'Gestión de Permisos',
		path: '/list/access-control',
		desc: 'Administra políticas de acceso.',
		permission: PERMISSIONS.ACCESS_POLICIES.READ_LIST
	},

	// Formularios (Agregar)
	ADD_DEVICE: {
		title: 'Agregar Nuevo Dispositivo',
		path: '/form/device/add',
		desc: 'Registra nuevo hardware.',
		permission: PERMISSIONS.DEVICES.CREATE
	},
	ADD_MODEL: {
		title: 'Agregar Nuevo Modelo',
		path: '/form/model/add',
		desc: 'Crea categorías de hardware.',
		permission: PERMISSIONS.MODELS.CREATE
	},
	ADD_BRAND: {
		title: 'Agregar Nueva Marca',
		path: '/form/brand/add',
		desc: 'Introduce nueva marca.',
		permission: PERMISSIONS.BRANDS.CREATE
	},
	ADD_PROCESSOR: {
		title: 'Agregar Nuevo Procesador',
		path: '/form/processor/add',
		desc: 'Registra nuevos procesadores.',
		permission: PERMISSIONS.PROCESSORS.CREATE
	},
	ADD_MIGRATION: {
		title: 'Agregar Nueva Regla de Migración',
		path: '/form/migration-rules/add',
		desc: 'Crea regla de migración.',
		permission: PERMISSIONS.MIGRATION_RULES.CREATE
	},
	ADD_SHIPMENT: {
		title: 'Crear Relación de Envío',
		path: '/form/shipment/add',
		desc: 'Genera guía de envío.',
		permission: PERMISSIONS.SHIPMENTS.CREATE
	},
	ADD_EMPLOYEE: {
		title: 'Agregar Nuevo Usuario',
		path: '/form/employee/add',
		desc: 'Registra personal nuevo.',
		permission: PERMISSIONS.EMPLOYEES.CREATE
	},
	ADD_UNIT: {
		title: 'Agregar Nueva Unidad',
		path: '/form/unidad/add',
		desc: 'Define unidades organizacionales.',
		permission: PERMISSIONS.UNIDADES.CREATE
	},
	ADD_CARGO: {
		title: 'Agregar Nuevo Cargo',
		path: '/form/cargo/add',
		desc: 'Define puestos de trabajo.',
		permission: PERMISSIONS.CARGOS.CREATE
	},
	ADD_LOCATION: {
		title: 'Agregar Nueva Ubicación',
		path: '/form/location/add',
		desc: 'Registra sede física.',
		permission: PERMISSIONS.LOCATIONS.CREATE
	},
	ADD_ISP: {
		title: 'Agregar Nuevo Proveedor ISP',
		path: '/form/isplink/add',
		desc: 'Registra proveedores de red.',
		permission: PERMISSIONS.ISP_LINKS.CREATE
	},
	ADD_SITE: {
		title: 'Agregar Nuevo Sitio',
		path: '/form/site/add',
		desc: 'Área específica dentro de una ubicación.',
		permission: PERMISSIONS.SITES.CREATE
	},
	ADD_CITY: {
		title: 'Agregar Nueva Ciudad',
		path: '/form/city/add',
		desc: 'Añade ciudad al catálogo.',
		permission: PERMISSIONS.CITIES.CREATE
	},
	FORM_REGION: {
		title: 'Asignación de Regiones',
		path: '/form/region',
		desc: 'Gestiona regiones por zona.',
		permission: PERMISSIONS.REGIONS.READ
	},
	ADD_PERMISSION: {
		title: 'Agregar Nuevo Permiso',
		path: '/form/permission/add',
		desc: 'Crea permisos individuales.',
		permission: PERMISSIONS.PERMISSIONS.CREATE
	},
	ADD_GROUP: {
		title: 'Agregar Nuevo Grupo de Permisos',
		path: '/form/permission-groups/add',
		desc: 'Agrupa autorizaciones.',
		permission: PERMISSIONS.PERMISSION_GROUPS.CREATE
	},
	ADD_POLICY: {
		title: 'Agregar Nueva Política',
		path: '/form/access-policy/add',
		desc: 'Define reglas de seguridad.',
		permission: PERMISSIONS.ACCESS_POLICIES.CREATE
	},
	ADMIN_CACHE: {
		title: 'Limpiar Caché',
		path: '/form/admin-clear-cache',
		desc: 'Mantenimiento del sistema.',
		permission: PERMISSIONS.ADMIN.CLEAR_CACHE
	}
}

/** Vista actual por Categoría Operativa */
export const navigationByCategory: Navigation[] = [
	{
		label: 'Análisis y Monitoreo',
		navs: [
			ITEMS.DASH_COMPUTER,
			ITEMS.DASH_HARDWARE,
			ITEMS.MON_LOCATION,
			ITEMS.MON_DEVICE,
			ITEMS.MAP_AGENCY,
			ITEMS.MAP_ADMIN
		]
	},
	{
		label: 'Gestión de Activos',
		navs: [
			ITEMS.LIST_COMPUTER,
			ITEMS.LIST_MONITOR,
			ITEMS.LIST_PRINTER,
			ITEMS.LIST_FIN_PRINTER,
			ITEMS.LIST_PARTS,
			ITEMS.LIST_MIGRATION,
			ITEMS.ADD_DEVICE,
			ITEMS.ADD_MODEL,
			ITEMS.LIST_MODEL,
			ITEMS.ADD_BRAND,
			ITEMS.ADD_PROCESSOR,
			ITEMS.ADD_MIGRATION
		]
	},
	{
		label: 'Logística y Envíos',
		navs: [ITEMS.LIST_SHIPMENT, ITEMS.ADD_SHIPMENT]
	},
	{
		label: 'Organización y Personal',
		navs: [ITEMS.LIST_USERS, ITEMS.ADD_EMPLOYEE, ITEMS.ADD_UNIT, ITEMS.ADD_CARGO]
	},
	{
		label: 'Ubicaciones y Sitios',
		navs: [
			ITEMS.LIST_LOCATION,
			ITEMS.ADD_LOCATION,
			ITEMS.ADD_ISP,
			ITEMS.ADD_SITE,
			ITEMS.ADD_CITY,
			ITEMS.FORM_REGION
		]
	},
	{
		label: 'Sistema',
		navs: [
			ITEMS.LIST_HISTORY,
			ITEMS.LIST_ACCESS,
			ITEMS.ADD_PERMISSION,
			ITEMS.ADD_GROUP,
			ITEMS.ADD_POLICY,
			ITEMS.ADMIN_CACHE
		]
	}
]

/** Nueva Vista por Tipo de Acción */
export const navigationByType: Navigation[] = [
	{
		label: 'Paneles y Monitoreo',
		navs: [
			ITEMS.DASH_COMPUTER,
			ITEMS.DASH_HARDWARE,
			ITEMS.MON_LOCATION,
			ITEMS.MON_DEVICE,
			ITEMS.MAP_AGENCY,
			ITEMS.MAP_ADMIN
		]
	},
	{
		label: 'Listados e Inventario',
		navs: [
			ITEMS.LIST_COMPUTER,
			ITEMS.LIST_MONITOR,
			ITEMS.LIST_PRINTER,
			ITEMS.LIST_FIN_PRINTER,
			ITEMS.LIST_PARTS,
			ITEMS.LIST_MODEL,
			ITEMS.LIST_USERS,
			ITEMS.LIST_LOCATION,
			ITEMS.LIST_SHIPMENT,
			ITEMS.LIST_MIGRATION,
			ITEMS.LIST_HISTORY,
			ITEMS.LIST_ACCESS
		]
	},
	{
		label: 'Registros y Formularios',
		navs: [
			ITEMS.ADD_DEVICE,
			ITEMS.ADD_SHIPMENT,
			ITEMS.ADD_EMPLOYEE,
			ITEMS.ADD_LOCATION,
			ITEMS.ADD_MODEL,
			ITEMS.ADD_BRAND,
			ITEMS.ADD_PROCESSOR,
			ITEMS.ADD_UNIT,
			ITEMS.ADD_CARGO,
			ITEMS.ADD_SITE,
			ITEMS.ADD_ISP,
			ITEMS.ADD_CITY,
			ITEMS.ADD_MIGRATION,
			ITEMS.FORM_REGION
		]
	},
	{
		label: 'Configuración y Seguridad',
		navs: [ITEMS.ADD_PERMISSION, ITEMS.ADD_GROUP, ITEMS.ADD_POLICY, ITEMS.ADMIN_CACHE]
	}
]

// Exportamos por defecto la versión original para no romper nada,
// pero ahora tenemos ambas disponibles.
export const navigation = navigationByCategory
