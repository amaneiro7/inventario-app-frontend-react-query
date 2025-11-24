import { PERMISSIONS } from '@/shared/config/permissions'
import { type RouterMetadata } from '../types/metaData'

export const dashboardIndexPath = '/dashboard'

export const DASHBOARD_ROUTES_METADATA: Record<string, RouterMetadata> = {
	[`${dashboardIndexPath}`]: {
		title: 'Dashboards | Visión General',
		description:
			'Selecciona el dashboard que necesitas para obtener una visión general del sistema. Accede a paneles de control de computadoras, monitores y más.',
		pathSegment: ''
	},
	[`${dashboardIndexPath}/computer`]: {
		title: 'Equipos de Computación | Dashboard',
		description:
			'Panel de control dedicado a los equipos de computación. Visualiza métricas clave, estado y tendencias de los equipos.',
		permission: PERMISSIONS.DASHBOARD.READ_COMPUTER_DASHBOARD,
		pathSegment: 'computer',
		iconName: 'computer'
	},
	[`${dashboardIndexPath}/monitor`]: {
		title: 'Monitores | Dashboard',
		description:
			'Dashboard para la visualización de información de monitores. Obtén detalles sobre el inventario y el estado.',
		permission: PERMISSIONS.DASHBOARD.READ_MONITOR_DASHBOARD,
		pathSegment: 'monitor',
		iconName: 'monitor'
	},
	[`${dashboardIndexPath}/printer`]: {
		title: 'Impresoras | Dashboard',
		description:
			'Panel de control para la gestión de impresoras. Visualiza el estado y la información relevante.',
		permission: PERMISSIONS.DASHBOARD.READ_PRINTER_DASHBOARD,
		pathSegment: 'printer',
		iconName: 'printer'
	},
	[`${dashboardIndexPath}/parts`]: {
		title: 'Partes | Dashboard',
		description:
			'Dashboard que ofrece una visión general de las partes y componentes del sistema de inventario.',
		permission: PERMISSIONS.DASHBOARD.READ_PARTS_DASHBOARD,
		pathSegment: 'parts',
		iconName: 'mouse'
	},
	[`${dashboardIndexPath}/finantialprinter`]: {
		title: 'Impresoras Financieras | Dashboard',
		description:
			'Panel de control específico para la gestión de impresoras financieras. Visualiza información relevante.',
		permission: PERMISSIONS.DASHBOARD.READ_FINANTIAL_PRINTER_DASHBOARD,
		pathSegment: 'finantialprinter',
		iconName: 'printer'
	},
	[`${dashboardIndexPath}/usuarios`]: {
		title: 'Gestión de Empleados | Dashboard',
		description:
			'Dashboard para la gestión de empleados. Visualiza información clave del personal y accede a herramientas de administración.',
		permission: PERMISSIONS.DASHBOARD.READ_EMPLOYEE_DASHBOARD,
		pathSegment: 'usuarios',
		iconName: 'user'
	}
}
