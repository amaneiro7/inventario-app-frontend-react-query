import { type DeviceMonitoringDashboardDto } from '../dto/DeviceMonitoringDashboard.dto'

/**
 * @abstract
 * @class DeviceMonitoringDashboardRepository
 * @description Contrato (interfaz abstracta) para un repositorio que permite obtener datos del dashboard de monitoreo de dispositivos.
 */
export abstract class DeviceMonitoringDashboardRepository {
	/**
	 * @abstract
	 * @method get
	 * @description Obtiene los datos del dashboard de monitoreo de dispositivos.
	 * @param {string} [queryParams] - Parámetros de consulta opcionales para filtrar los resultados.
	 * @returns {Promise<DeviceMonitoringDashboardDto>} Una promesa que se resuelve con el DTO del dashboard de monitoreo de dispositivos.
	 */	abstract get(queryParams?: string): Promise<DeviceMonitoringDashboardDto>
}