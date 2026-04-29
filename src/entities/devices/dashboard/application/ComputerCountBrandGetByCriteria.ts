import { GetComputerCountBrandDashboard } from './GetComputerCountBrandDashboard'
import {
	createComputerCountBrandQueryParams,
	type ComputerCountBrandDashboardFilters
} from './createComputerCountBrandQueryParams'
import type { ComputerCountBrandDashboardRepository } from '../domain/repository/ComputerCountBrandDashboardRepository'

/**
 * @class ComputerCountBrandGetByCriteria
 * @description Clase de caso de uso para obtener entidades `DeviceMonitoring` por criterios de búsqueda.
 * Utiliza `GetComputerCountBrandDashboard` para ejecutar la búsqueda con parámetros construidos dinámicamente.
 */
export class ComputerCountBrandGetByCriteria {
	/**
	 * Opciones de tamaño de página disponibles para la paginación.
	 * @static
	 * @type {number[]}
	 */
	static readonly pageSizeOptions: number[] = [10, 25, 50, 100]
	/**
	 * Tamaño de página por defecto.
	 * @static
	 * @type {number}
	 */
	static readonly defaultPageSize: number = 25
	private readonly getAll: GetComputerCountBrandDashboard

	/**
	 * Crea una instancia de `ComputerCountBrandGetByCriteria`.
	 * @param {ComputerCountBrandDashboardRepository} repository - El repositorio para obtener todas las monitorizaciones de dispositivos.
	 */
	constructor(private readonly repository: ComputerCountBrandDashboardRepository) {
		this.getAll = new GetComputerCountBrandDashboard(this.repository)
	}

	/**
	 * Busca monitorizaciones de dispositivos basándose en los filtros proporcionados.
	 * Construye los parámetros de la consulta y delega la ejecución a `GetComputerCountBrandDashboard`.
	 * @param {DeviceMonitoringFilters} query - Los filtros a aplicar en la búsqueda.
	 * @returns {Promise<import('@/entities/shared/domain/methods/Response').Response<DeviceMonitoringDto>>} Una promesa que se resuelve con la respuesta de la búsqueda.
	 */
	async search(query: ComputerCountBrandDashboardFilters) {
		const queryParams = await createComputerCountBrandQueryParams(query)

		return await this.getAll.execute(queryParams)
	}
}
