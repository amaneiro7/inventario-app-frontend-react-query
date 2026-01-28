import { HardDriveCapacityGetAll } from './HardDriveCapacityGetAll'
import {
	createHardDriveCapacityParams,
	type HardDriveCapacityFilters
} from './createHardDriveCapacityQueryParams'
import { type HardDriveCapacityGetAllRepository } from '../domain/repository/HardDriveCapacityGetAllRepository'

/**
 * @class HardDriveCapacityGetByCriteria
 * @description Clase de caso de uso para obtener entidades `HardDriveCapacity` por criterios de búsqueda.
 * Utiliza `HardDriveCapacityGetAll` para ejecutar la búsqueda con parámetros construidos dinámicamente.
 */
export class HardDriveCapacityGetByCriteria {
	private readonly getAll: HardDriveCapacityGetAll

	/**
	 * Crea una instancia de `HardDriveCapacityGetByCriteria`.
	 * @param {HardDriveCapacityGetAllRepository} repository - El repositorio para obtener todas las capacidades de disco duro.
	 */ constructor(private readonly repository: HardDriveCapacityGetAllRepository) {
		this.getAll = new HardDriveCapacityGetAll(this.repository)
	}

	/**
	 * Busca capacidades de disco duro basándose en los filtros proporcionados.
	 * Construye los parámetros de la consulta y delega la ejecución a `HardDriveCapacityGetAll`.
	 * @param {HardDriveCapacityFilters} filters - Los filtros a aplicar en la búsqueda.
	 * @returns {Promise<import('@/entities/shared/domain/methods/Response').Response<import('../domain/dto/HardDriveCapacity.dto').HardDriveCapacityDto>>} Una promesa que se resuelve con la respuesta de la búsqueda.
	 */ async search({
		pageNumber,
		pageSize,
		orderBy,
		orderType,
		...options
	}: HardDriveCapacityFilters) {
		const queryParams = await createHardDriveCapacityParams({
			...options,
			pageNumber,
			pageSize,
			orderBy,
			orderType
		})

		return await this.getAll.execute(queryParams)
	}
}
