import { OperatingSystemGetAll } from './OperatingSystemGetAll'
import { type OperatingSystemGetAllRepository } from '../domain/repository/OperatingSystemGetAllRepository'
import {
	createOperatingSystemParams,
	type OperatingSystemFilters
} from './createOperatingSystemQueryParams'

/**
 * @class OperatingSystemGetByCriteria
 * @description Clase de caso de uso para obtener entidades `OperatingSystem` por criterios de búsqueda.
 * Utiliza `OperatingSystemGetAll` para ejecutar la búsqueda con parámetros construidos dinámicamente.
 */
export class OperatingSystemGetByCriteria {
	private readonly getAll: OperatingSystemGetAll

	/**
	 * Crea una instancia de `OperatingSystemGetByCriteria`.
	 * @param {OperatingSystemGetAllRepository} repository - El repositorio para obtener todos los sistemas operativos.
	 */	constructor(private readonly repository: OperatingSystemGetAllRepository) {
		this.getAll = new OperatingSystemGetAll(this.repository)
	}

	/**
	 * Busca sistemas operativos basándose en los filtros proporcionados.
	 * Construye los parámetros de la consulta y delega la ejecución a `OperatingSystemGetAll`.
	 * @param {OperatingSystemFilters} filters - Los filtros a aplicar en la búsqueda.
	 * @returns {Promise<import('@/entities/shared/domain/methods/Response').Response<import('../domain/dto/OperatingSystem.dto').OperatingSystemDto>>} Una promesa que se resuelve con la respuesta de la búsqueda.
	 */	async search({
		pageNumber,
		pageSize,
		orderBy,
		orderType,
		...options
	}: OperatingSystemFilters) {
		const queryParams = await createOperatingSystemParams({
			...options,
			pageNumber,
			pageSize,
			orderBy,
			orderType
		})

		return await this.getAll.execute(queryParams)
	}
}