import { PERMISSIONS } from '@/shared/config/permissions'
import { type RouterMetadata } from '../types/metaData'

export const monitoringIndexPath = '/monitoring'

export const MONITORING_ROUTES_METADATA: Record<string, RouterMetadata> = {
	[`${monitoringIndexPath}`]: {
		title: 'Panel de Monitoreo de Red',
		description: 'Visualiza el estado general de la red y la conectividad de tus dispositivos.',
		pathSegment: ''
	},
	[`${monitoringIndexPath}/location`]: {
		title: 'Monitoreo de Ubicaciones Individuales',
		description:
			'Consulta el estado en tiempo real, histórico de pings y detalles de cada ubicación.',
		permission: PERMISSIONS.LOCATIONS.READ_MONITORING_DASHBOARD,
		pathSegment: 'location',
		iconName: 'mapPinCheck'
	},
	[`${monitoringIndexPath}/device`]: {
		title: 'Monitoreo de Dispositivos Individuales',
		description:
			'Consulta el estado en tiempo real, histórico de pings y detalles de cada dispositivo.',
		permission: PERMISSIONS.DEVICES.READ_MONITORING_DASHBOARD,
		pathSegment: 'device',
		iconName: 'server'
	},
	[`${monitoringIndexPath}/agencymap`]: {
		title: 'Mapa de Conectividad de Agencias',
		description:
			'Visualiza el estado de los enlaces y la conectividad de las agencias a nivel nacional.',
		permission: PERMISSIONS.LOCATIONS.READ_MONITORING_BY_STATE_DASHBOARD,
		pathSegment: 'agencymap',
		iconName: 'map'
	},
	[`${monitoringIndexPath}/administrativesitemap`]: {
		title: 'Mapa de Conectividad de Torres Administrativas',
		description:
			'Visualiza el estado de los equipos de red activos en las torres administrativas a nivel nacional.',
		permission: PERMISSIONS.LOCATIONS.READ_MONITORING_BY_LOCATION_DASHBOARD,
		pathSegment: 'administrativesitemap',
		iconName: 'flag'
	}
}
