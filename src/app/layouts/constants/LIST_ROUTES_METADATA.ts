import { PERMISSIONS } from '@/shared/config/permissions'
import { type RouterMetadata } from '../types/metaData'

export const listIndexPath = '/list'

export const LIST_ROUTES_METADATA: Record<string, RouterMetadata> = {
	[`${listIndexPath}`]: {
		title: 'Listados Generales',
		description:
			'Explora todas las listas de inventario disponibles. Encuentra y accede a la información organizada por categorías.',
		pathSegment: ''
	},
	[`${listIndexPath}/computer`]: {
		title: 'Equipos de Computación | Listado',
		description:
			'Consulta el listado completo de equipos de computación disponibles. Filtra, busca y gestiona la información detallada de cada equipo.',
		permission: PERMISSIONS.DEVICES.READ_LIST,
		pathSegment: ''
	},
	[`${listIndexPath}/shipment`]: {
		title: 'Relaciones de Envío | Listado',
		description:
			'Consulta el listado completo de envíos de dispositivos. Filtra, busca y gestiona la información detallada de cada envío.',
		permission: PERMISSIONS.DEVICES.READ_LIST,
		pathSegment: ''
	},
	[`${listIndexPath}/monitor`]: {
		title: 'Monitores | Listado',
		description:
			'Página con la lista de monitores. Explora especificaciones, estado y realiza acciones de gestión.',
		permission: PERMISSIONS.DEVICES.READ_LIST,
		pathSegment: ''
	},
	[`${listIndexPath}/finantialprinter`]: {
		title: 'Impresoras Financieras | Listado',
		description:
			'Listado de impresoras financieras disponibles. Revisa detalles y gestiona su información.',
		permission: PERMISSIONS.DEVICES.READ_LIST,
		pathSegment: ''
	},
	[`${listIndexPath}/printer`]: {
		title: 'Impresoras | Listado',
		description:
			'Explora la lista de impresoras. Accede a detalles técnicos y opciones de gestión.',
		permission: PERMISSIONS.DEVICES.READ_LIST,
		pathSegment: ''
	},
	[`${listIndexPath}/parts`]: {
		title: 'Partes | Listado',
		description:
			'Dashboard que ofrece una visión general de las partes y componentes del sistema de inventario.',
		permission: PERMISSIONS.DEVICES.READ_LIST,
		pathSegment: ''
	},
	[`${listIndexPath}/usuarios`]: {
		title: 'Gestión de Empleados',
		description:
			'Administra la información de los empleados. Crea, edita y gestiona los registros de personal de forma eficiente.',
		permission: PERMISSIONS.EMPLOYEES.READ_LIST,
		pathSegment: ''
	},
	[`${listIndexPath}/model`]: {
		title: 'Modelos | Listado',
		description:
			'Lista de modelos de equipos. Consulta detalles y gestiona la información de los modelos.',
		permission: PERMISSIONS.MODELS.READ_LIST,
		pathSegment: ''
	},
	[`${listIndexPath}/location`]: {
		title: 'Sitios | Listado',
		description:
			'Listado de sitios o ubicaciones. Gestiona la información de los diferentes sitios.',
		permission: PERMISSIONS.LOCATIONS.READ_LIST,
		pathSegment: ''
	},
	[`${listIndexPath}/history`]: {
		title: 'Historial de Cambios',
		description:
			'Revisa el registro completo del historial de cambios realizados en el sistema. Mantente al tanto de las modificaciones.',
		permission: PERMISSIONS.HISTORY.READ_LIST,
		pathSegment: ''
	},
	[`${listIndexPath}/access-control`]: {
		title: 'Control de Acceso',
		description:
			'Gestiona los roles, permisos y grupos de permisos para controlar el acceso de los usuarios a las funcionalidades del sistema.',
		permission: PERMISSIONS.ACCESS_POLICIES.READ_LIST,
		pathSegment: ''
	}
}
