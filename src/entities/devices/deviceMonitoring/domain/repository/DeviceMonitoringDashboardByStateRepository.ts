import { type DeviceMonitoringDashboardByStateDto } from '../dto/DeviceMonitoringDashboardByState.dto'

/**
 * @abstract
 * @class DeviceMonitoringDashboardByStateRepository
 * @description Contrato (interfaz abstracta) para un repositorio que permite obtener datos del dashboard de monitoreo de dispositivos por estado.
 */
export abstract class DeviceMonitoringDashboardByStateRepository {
	/**
	 * @abstract
	 * @method get
	 * @description Obtiene los datos del dashboard de monitoreo de dispositivos por estado.
	 * @param {string} [queryParams] - Parámetros de consulta opcionales para filtrar los resultados.
	 * @returns {Promise<DeviceMonitoringDashboardByStateDto>} Una promesa que se resuelve con el DTO del dashboard de monitoreo de dispositivos por estado.
	 */ abstract get(queryParams?: string): Promise<DeviceMonitoringDashboardByStateDto>
}
