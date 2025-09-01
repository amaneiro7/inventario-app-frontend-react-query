/**
 * @interface DeviceMonitoringDashboardByLocationDto
 * @description Data Transfer Object para el dashboard de monitoreo de dispositivos por ubicación.
 * Agrupa sitios y sus ubicaciones con estadísticas de monitoreo.
 * @property {string} name - Nombre de la región o agrupación principal.
 * @property {Site[]} sites - Array de sitios dentro de esta agrupación.
 */
export interface DeviceMonitoringDashboardByLocationDto {
	name: string
	sites: Site[]
}

/**
 * @interface Site
 * @description Representa un sitio dentro del dashboard de monitoreo por ubicación.
 * @property {string} name - Nombre del sitio.
 * @property {Locations[]} locations - Array de ubicaciones dentro de este sitio.
 * @property {number} total - Cantidad total de dispositivos en el sitio.
 * @property {number} onlineCount - Cantidad de dispositivos en línea en el sitio.
 * @property {number} offlineCount - Cantidad de dispositivos fuera de línea en el sitio.
 */
export interface Site {
	name: string
	locations: Locations[]
	total: number
	onlineCount: number
	offlineCount: number
}

/**
 * @interface Locations
 * @description Representa una ubicación específica dentro de un sitio en el dashboard de monitoreo.
 * @property {string} name - Nombre de la ubicación.
 * @property {number} total - Cantidad total de dispositivos en la ubicación.
 * @property {number} onlineCount - Cantidad de dispositivos en línea en la ubicación.
 * @property {number} offlineCount - Cantidad de dispositivos fuera de línea en la ubicación.
 */
export interface Locations {
	name: string
	total: number
	onlineCount: number
	offlineCount: number
	vpeName: Array<string | null>
}
