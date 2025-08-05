import { DeviceGetAllRepository } from '../../domain/repository/DeviceGetAllRepository'
import { DeviceGetAll } from '../DeviceGetAll'
import { MainCategoryOptions } from '@/entities/mainCategory/domain/entity/MainCategoryOptions'
import { createDeviceQueryParams, type DeviceBaseFilters } from '../createDeviceQueryParams'

export const defaultMainCategoryValue = MainCategoryOptions.COMPUTER

/**
 * @class DeviceComputerFilter
 * @description Clase de caso de uso para filtrar dispositivos de tipo 'computadora'.
 * Define opciones de paginación y ordenación por defecto, y utiliza `createDeviceQueryParams`
 * para construir los parámetros de consulta específicos para computadoras.
 */
export class DeviceComputerFilter {
	/**
	 * Opciones de tamaño de página disponibles para la paginación.
	 * @static
	 * @type {number[]}
	 */ static readonly pageSizeOptions = [10, 25, 50, 100]
	/**
	 * Tamaño de página por defecto.
	 * @static
	 * @type {number}
	 */ static readonly defaultPageSize = 25
	/**
	 * Campo de ordenación por defecto.
	 * @static
	 * @type {string}
	 */ static readonly defaultOrderBy = 'employeeId'
	private readonly getAll: DeviceGetAll

	/**
	 * Crea una instancia de `DeviceComputerFilter`.
	 * @param {DeviceGetAllRepository} repository - El repositorio para obtener todos los dispositivos.
	 */ constructor(private readonly repository: DeviceGetAllRepository) {
		this.getAll = new DeviceGetAll(this.repository)
	}

	/**
	 * Busca dispositivos de tipo 'computadora' basándose en los filtros proporcionados.
	 * @param {DeviceBaseFilters} filters - Los filtros a aplicar en la búsqueda.
	 * @returns {Promise<import('@/entities/shared/domain/methods/Response').Response<import('../../domain/dto/Device.dto').DeviceDto>>} Una promesa que se resuelve con la respuesta de la búsqueda.
	 */ async search({
		pageNumber,
		pageSize = DeviceComputerFilter.defaultPageSize,
		orderBy = DeviceComputerFilter.defaultOrderBy,
		orderType,
		...options
	}: DeviceBaseFilters) {
		const queryParams = await createDeviceQueryParams(
			{
				...options,
				pageNumber,
				pageSize,
				orderBy,
				orderType,
				defaultQuery: 'computer'
			},
			['serial', 'activo', 'computerName', 'ipAddress', 'processor']
		)

		return this.getAll.execute(queryParams)
	}
}
