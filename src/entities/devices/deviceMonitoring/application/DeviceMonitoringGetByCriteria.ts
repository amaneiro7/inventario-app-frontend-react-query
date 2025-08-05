import { type DeviceMonitoringGetAllRepository } from '../domain/repository/DeviceMonitoringGetAllRepository'
import {
	createDeviceMonitoringParams,
	type DeviceMonitoringFilters
} from './createDeviceMonitoringQueryParams'
import { DeviceMonitoringGetAll } from './DeviceMonitoringGetAll'

/**
 * @class DeviceMonitoringGetByCriteria
 * @description Clase de caso de uso para obtener entidades `DeviceMonitoring` por criterios de búsqueda.
 * Utiliza `DeviceMonitoringGetAll` para ejecutar la búsqueda con parámetros construidos dinámicamente.
 */
export class DeviceMonitoringGetByCriteria {
	/**
	 * Opciones de tamaño de página disponibles para la paginación.
	 * @static
	 * @type {number[]}
	 */	static readonly pageSizeOptions = [10, 25, 50, 100]
	/**
	 * Tamaño de página por defecto.
	 * @static
	 * @type {number}
	 */	static readonly defaultPageSize = 25
	private readonly getAll: DeviceMonitoringGetAll

	/**
	 * Crea una instancia de `DeviceMonitoringGetByCriteria`.
	 * @param {DeviceMonitoringGetAllRepository} repository - El repositorio para obtener todas las monitorizaciones de dispositivos.
	 */	constructor(private readonly repository: DeviceMonitoringGetAllRepository) {
		this.getAll = new DeviceMonitoringGetAll(this.repository)
	}

	/**
	 * Busca monitorizaciones de dispositivos basándose en los filtros proporcionados.
	 * Construye los parámetros de la consulta y delega la ejecución a `DeviceMonitoringGetAll`.
	 * @param {DeviceMonitoringFilters} query - Los filtros a aplicar en la búsqueda.
	 * @returns {Promise<import('@/entities/shared/domain/methods/Response').Response<DeviceMonitoringDto>>} Una promesa que se resuelve con la respuesta de la búsqueda.
	 */	async search(query: DeviceMonitoringFilters) {
		const queryParams = await createDeviceMonitoringParams(query)

		return await this.getAll.execute(queryParams)
	}
}