import { type DeviceMonitoringDashboardByLocationDto } from '../dto/DeviceMonitoringDashboardByLocation.dto'

/**
 * @abstract
 * @class DeviceMonitoringDashboardByLocationRepository
 * @description Contrato (interfaz abstracta) para un repositorio que permite obtener datos del dashboard de monitoreo de dispositivos por ubicación.
 */
export abstract class DeviceMonitoringDashboardByLocationRepository {
	/**
	 * @abstract
	 * @method get
	 * @description Obtiene los datos del dashboard de monitoreo de dispositivos por ubicación.
	 * @param {string} [queryParams] - Parámetros de consulta opcionales para filtrar los resultados.
	 * @returns {Promise<DeviceMonitoringDashboardByLocationDto[]>} Una promesa que se resuelve con un array de DTOs del dashboard de monitoreo de dispositivos por ubicación.
	 */ abstract get(queryParams?: string): Promise<DeviceMonitoringDashboardByLocationDto[]>
}
