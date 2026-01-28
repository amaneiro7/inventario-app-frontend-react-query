import { fetching } from '@/shared/api/api'
import { type DeviceMonitoringDashboardRepository } from '../../domain/repository/DeviceMonitoringDashboardRepository'
import { type DeviceMonitoringDashboardDto } from '../../domain/dto/DeviceMonitoringDashboard.dto'
import { deviceMonitoringDashboardUrl } from '../../domain/entity/baseUrl'

/**
 * @class DeviceMonitoringDashboardService
 * @implements {DeviceMonitoringDashboardRepository}
 * @description Implementación concreta del repositorio `DeviceMonitoringDashboardRepository` para obtener datos del dashboard de monitoreo de dispositivos.
 * Utiliza la función `fetching` para realizar la petición HTTP a la API.
 */
export class DeviceMonitoringDashboardService implements DeviceMonitoringDashboardRepository {
	/**
	 * Obtiene los datos del dashboard de monitoreo de dispositivos, opcionalmente filtrados por parámetros de consulta.
	 * @param {string} [queryParams] - Cadena de parámetros de consulta para filtrar los resultados.
	 * @returns {Promise<DeviceMonitoringDashboardDto>} Una promesa que se resuelve con el DTO del dashboard de monitoreo de dispositivos.
	 */ async get(queryParams?: string): Promise<DeviceMonitoringDashboardDto> {
		return await fetching({
			url: `${deviceMonitoringDashboardUrl}?${queryParams}`,
			method: 'GET'
		})
	}
}
