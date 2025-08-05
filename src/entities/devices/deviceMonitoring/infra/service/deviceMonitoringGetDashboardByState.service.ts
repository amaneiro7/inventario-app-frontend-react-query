import { fetching } from '@/shared/api/api'
import { type DeviceMonitoringDashboardByStateRepository } from '../../domain/repository/DeviceMonitoringDashboardByStateRepository'
import { type DeviceMonitoringDashboardByStateDto } from '../../domain/dto/DeviceMonitoringDashboardByState.dto'
import { deviceMonitoringDashboardByStateUrl } from '../../domain/entity/baseUrl'

/**
 * @class DeviceMonitoringDashboardByStateService
 * @implements {DeviceMonitoringDashboardByStateRepository}
 * @description Implementación concreta del repositorio `DeviceMonitoringDashboardByStateRepository` para obtener datos del dashboard de monitoreo de dispositivos por estado.
 * Utiliza la función `fetching` para realizar la petición HTTP a la API.
 */
export class DeviceMonitoringDashboardByStateService
	implements DeviceMonitoringDashboardByStateRepository
{
	/**
	 * Obtiene los datos del dashboard de monitoreo de dispositivos por estado, opcionalmente filtrados por parámetros de consulta.
	 * @param {string} [queryParams] - Cadena de parámetros de consulta para filtrar los resultados.
	 * @returns {Promise<DeviceMonitoringDashboardByStateDto>} Una promesa que se resuelve con el DTO del dashboard de monitoreo de dispositivos por estado.
	 */	async get(queryParams?: string): Promise<DeviceMonitoringDashboardByStateDto> {
		return await fetching({
			url: `${deviceMonitoringDashboardByStateUrl}?${queryParams}`,
			method: 'GET'
		})
	}
}