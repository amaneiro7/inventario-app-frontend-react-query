import { fetching } from '@/shared/api/api'
import { deviceMonitoringUrl } from '../../domain/entity/baseUrl'
import { type DeviceMonitoringGetAllRepository } from '../../domain/repository/DeviceMonitoringGetAllRepository'
import { type DeviceMonitoringDto } from '../../domain/dto/DeviceMonitoring.dto'
import { type Response } from '@/entities/shared/domain/methods/Response'

/**
 * @class DeviceMonitoringGetAllService
 * @implements {DeviceMonitoringGetAllRepository}
 * @description Implementación concreta del repositorio `DeviceMonitoringGetAllRepository` para obtener todas las monitorizaciones de dispositivos.
 * Utiliza la función `fetching` para realizar la petición HTTP a la API.
 */
export class DeviceMonitoringGetAllService implements DeviceMonitoringGetAllRepository {
	/**
	 * Obtiene todas las monitorizaciones de dispositivos, opcionalmente filtradas por parámetros de consulta.
	 * @param {string} [queryParams] - Cadena de parámetros de consulta para filtrar los resultados.
	 * @returns {Promise<Response<DeviceMonitoringDto>>} Una promesa que se resuelve con un objeto de respuesta que contiene las monitorizaciones de dispositivos.
	 */ async getAll(queryParams?: string): Promise<Response<DeviceMonitoringDto>> {
		return await fetching({ url: `${deviceMonitoringUrl}?${queryParams}`, method: 'GET' })
	}
}
