import { fetching } from '@/shared/api/api'
import { type DeviceMonitoringDashboardByLocationRepository } from '../../domain/repository/DeviceMonitoringDashboardByLocationRepository'
import { type DeviceMonitoringDashboardByLocationDto } from '../../domain/dto/DeviceMonitoringDashboardByLocation.dto'
import { deviceMonitoringDashboardByLocationUrl } from '../../domain/entity/baseUrl'

/**
 * @class DeviceMonitoringDashboardByLocationService
 * @implements {DeviceMonitoringDashboardByLocationRepository}
 * @description Implementación concreta del repositorio `DeviceMonitoringDashboardByLocationRepository` para obtener datos del dashboard de monitoreo de dispositivos por ubicación.
 * Utiliza la función `fetching` para realizar la petición HTTP a la API.
 */
export class DeviceMonitoringDashboardByLocationService implements DeviceMonitoringDashboardByLocationRepository {
	/**
	 * Obtiene los datos del dashboard de monitoreo de dispositivos por ubicación, opcionalmente filtrados por parámetros de consulta.
	 * @param {string} [queryParams] - Cadena de parámetros de consulta para filtrar los resultados.
	 * @returns {Promise<DeviceMonitoringDashboardByLocationDto[]>} Una promesa que se resuelve con un array de DTOs del dashboard de monitoreo de dispositivos por ubicación.
	 */ async get(queryParams?: string): Promise<DeviceMonitoringDashboardByLocationDto[]> {
		return await fetching({
			url: `${deviceMonitoringDashboardByLocationUrl}?${queryParams}`,
			method: 'GET'
		})
	}
}
