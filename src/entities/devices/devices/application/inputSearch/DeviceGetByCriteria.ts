import { DeviceGetAllRepository } from '../../domain/repository/DeviceGetAllRepository'
import { DeviceGetAll } from '../DeviceGetAll'

import {
	createDeviceQueryParams,
	type DeviceBaseFilters
} from '@/entities/devices/devices/application/createDeviceQueryParams'

/**
 * @class DeviceGetByCriteria
 * @description Clase de caso de uso para obtener entidades `Device` por criterios de búsqueda específicos para inputs de búsqueda.
 * Define opciones de paginación y ordenación por defecto, y utiliza `createDeviceQueryParams`
 * para construir los parámetros de consulta.
 */
export class DeviceGetByCriteria {
	/**
	 * Opciones de tamaño de página disponibles para la paginación.
	 * @static
	 * @type {number[]}
	 */ static readonly pageSizeOptions = [10, 25, 50, 100]
	/**
	 * Tamaño de página por defecto.
	 * @static
	 * @type {number}
	 */ static readonly defaultPageSize = 10
	/**
	 * Campo de ordenación por defecto.
	 * @static
	 * @type {string}
	 */ static readonly defaultOrderBy = 'serial'
	private readonly getAll: DeviceGetAll

	/**
	 * Crea una instancia de `DeviceGetByCriteria`.
	 * @param {DeviceGetAllRepository} repository - El repositorio para obtener todos los dispositivos.
	 */ constructor(private readonly repository: DeviceGetAllRepository) {
		this.getAll = new DeviceGetAll(this.repository)
	}

	/**
	 * Busca dispositivos basándose en los filtros proporcionados.
	 * @param {DeviceBaseFilters} filters - Los filtros a aplicar en la búsqueda.
	 * @returns {Promise<import('@/entities/shared/domain/methods/Response').Response<import('../../domain/dto/Device.dto').DeviceDto>>} Una promesa que se resuelve con la respuesta de la búsqueda.
	 */ async search({
		pageNumber,
		pageSize = DeviceGetByCriteria.defaultPageSize,
		orderBy = DeviceGetByCriteria.defaultOrderBy,
		orderType,
		...options
	}: DeviceBaseFilters) {
		const queryParams = await createDeviceQueryParams(
			{
				...options,
				pageNumber,
				pageSize,
				orderBy,
				orderType
			},
			['serial']
		)

		return await this.getAll.execute(queryParams)
	}
}
