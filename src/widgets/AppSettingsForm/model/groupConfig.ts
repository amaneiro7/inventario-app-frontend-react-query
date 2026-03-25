import type { IconName } from '@/shared/ui/icon/Icon'

export const groupConfigs: Record<
	string,
	{ title: string; description: string; iconName: IconName }
> = {
	security: {
		title: 'Seguridad',
		description: 'Configuraciones de seguridad y autenticación',
		iconName: 'shield'
	},
	location_monitoring: {
		title: 'Monitoreo de Ubicación',
		description: 'Configuraciones para el seguimiento de ubicación',
		iconName: 'mapPin'
	},
	device_monitoring: {
		title: 'Monitoreo de Dispositivos',
		description: 'Configuraciones para el seguimiento de dispositivos',
		iconName: 'smartphone'
	}
}
