import { PERMISSIONS } from '@/shared/config/permissions'
import { type RouterMetadata } from '../types/metaData'

export const formIndexPath = '/form'

export const FORM_ROUTES_METADATA: Record<string, RouterMetadata> = {
	[`${formIndexPath}`]: {
		title: 'Selección de Formularios | Gestión de Sistema',
		description:
			'Selecciona el formulario que necesitas para gestionar dispositivos, empleados, ubicaciones y más en el sistema.',
		pathSegment: ''
	},
	[`${formIndexPath}/device`]: {
		title: 'Dispositivo',
		description: 'Formulario para registrar o editar información de un dispositivo.',
		permission: PERMISSIONS.DEVICES.CREATE, // O una combinación de CREATE/UPDATE
		pathSegment: 'device/add',
		iconName: 'computer'
	},
	[`${formIndexPath}/shipment`]: {
		title: 'Relación de Envio',
		description: 'Formulario para registrar o editar una relación de envío.',
		permission: PERMISSIONS.SHIPMENTS.CREATE,
		pathSegment: 'shipment/add',
		iconName: 'truck'
	},
	[`${formIndexPath}/model`]: {
		title: 'Modelo',
		description: 'Formulario para registrar o editar un modelo de dispositivo.',
		permission: PERMISSIONS.MODELS.CREATE,
		pathSegment: 'model/add',
		iconName: 'package'
	},
	[`${formIndexPath}/brand`]: {
		title: 'Marca',
		description: 'Formulario para registrar o editar una marca.',
		permission: PERMISSIONS.BRANDS.CREATE,
		pathSegment: 'brand/add',
		iconName: 'factory'
	},
	[`${formIndexPath}/processor`]: {
		title: 'Procesador',
		description: 'Formulario para registrar o editar un procesador.',
		permission: PERMISSIONS.PROCESSORS.CREATE,
		pathSegment: 'processor/add',
		iconName: 'cpu'
	},
	[`${formIndexPath}/employee`]: {
		title: 'Empleado',
		description: 'Formulario para registrar o editar un empleado.',
		permission: PERMISSIONS.EMPLOYEES.CREATE,
		pathSegment: 'employee/add',
		iconName: 'userPlus'
	},
	[`${formIndexPath}/directiva`]: {
		title: 'Directiva',
		description: 'Formulario para registrar o editar una directiva.',
		permission: PERMISSIONS.LOCATIONS.CREATE,
		pathSegment: 'directiva/add',
		iconName: 'scale'
	},
	[`${formIndexPath}/vicepresidenciaejecutiva`]: {
		title: 'Vicepresidencia Ejecutiva',
		description: 'Formulario para registrar o editar una vicepresidencia ejecutiva.',
		permission: PERMISSIONS.LOCATIONS.CREATE,
		pathSegment: 'vicepresidenciaejecutiva/add',
		iconName: 'briefcase'
	},
	[`${formIndexPath}/vicepresidencia`]: {
		title: 'Vicepresidencia',
		description: 'Formulario para registrar o editar una vicepresidencia.',
		permission: PERMISSIONS.LOCATIONS.CREATE,
		pathSegment: 'vicepresidencia/add',
		iconName: 'briefcase'
	},
	[`${formIndexPath}/departamento`]: {
		title: 'Departamento',
		description: 'Formulario para registrar o editar un departamento.',
		permission: PERMISSIONS.LOCATIONS.CREATE,
		pathSegment: 'departamento/add',
		iconName: 'layers'
	},
	[`${formIndexPath}/cargo`]: {
		title: 'Cargo',
		description: 'Formulario para registrar o editar un cargo.',
		permission: PERMISSIONS.LOCATIONS.CREATE,
		pathSegment: 'cargo/add',
		iconName: 'badge'
	},
	[`${formIndexPath}/location`]: {
		title: 'Ubicación',
		description: 'Formulario para registrar o editar una ubicación.',
		permission: PERMISSIONS.LOCATIONS.CREATE,
		pathSegment: 'location/add',
		iconName: 'mapPin'
	},
	[`${formIndexPath}/site`]: {
		title: 'Sitio',
		description: 'Formulario para registrar o editar un sitio.',
		permission: PERMISSIONS.SITES.CREATE,
		pathSegment: 'site/add',
		iconName: 'building'
	},
	[`${formIndexPath}/city`]: {
		title: 'Ciudad',
		description: 'Formulario para registrar o editar una ciudad.',
		permission: PERMISSIONS.CITIES.CREATE,
		pathSegment: 'city/add',
		iconName: 'building2'
	},
	[`${formIndexPath}/region`]: {
		title: 'Región',
		description: 'Formulario para asignar una región a un sitio administrativo.',
		permission: PERMISSIONS.REGIONS.READ, // Corregido para que coincida con la ruta
		pathSegment: 'region',
		iconName: 'map'
	},
	[`${formIndexPath}/access-policy`]: {
		title: 'Política de Acceso',
		description: 'Formulario para registrar o editar una política de acceso.',
		permission: PERMISSIONS.ACCESS_POLICIES.CREATE,
		pathSegment: 'access-policy/add',
		iconName: 'shieldCheck'
	},
	[`${formIndexPath}/permission`]: {
		title: 'Permiso',
		description: 'Formulario para registrar o editar un permiso.',
		permission: PERMISSIONS.PERMISSIONS.CREATE,
		pathSegment: 'permission/add',
		iconName: 'keyRound'
	},
	[`${formIndexPath}/permission-groups`]: {
		title: 'Grupo de Permisos',
		description: 'Formulario para registrar o editar un grupo de permisos.',
		permission: PERMISSIONS.PERMISSION_GROUPS.CREATE,
		pathSegment: 'permission-groups/add',
		iconName: 'shield'
	}
}
