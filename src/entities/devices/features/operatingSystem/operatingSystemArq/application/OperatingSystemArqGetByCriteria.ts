import { type OperatingSystemArqGetAllRepository } from '../domain/repository/OperatingSystemArqGetAllRepository'
import { OperatingSystemArqGetAll } from './OperatingSystemArqGetAll'
import {
	createOperatingSystemArqParams,
	type OperatingSystemArqFilters
} from './createOperatingSystemArqQueryParams'

/**
 * @class OperatingSystemArqGetByCriteria
 * @description Clase de caso de uso para obtener entidades `OperatingSystemArq` por criterios de búsqueda.
 * Utiliza `OperatingSystemArqGetAll` para ejecutar la búsqueda con parámetros construidos dinámicamente.
 */
export class OperatingSystemArqGetByCriteria {
	private readonly getAll: OperatingSystemArqGetAll

	/**
	 * Crea una instancia de `OperatingSystemArqGetByCriteria`.
	 * @param {OperatingSystemArqGetAllRepository} repository - El repositorio para obtener todas las arquitecturas de sistema operativo.
	 */	constructor(private readonly repository: OperatingSystemArqGetAllRepository) {
		this.getAll = new OperatingSystemArqGetAll(this.repository)
	}

	/**
	 * Busca arquitecturas de sistema operativo basándose en los filtros proporcionados.
	 * Construye los parámetros de la consulta y delega la ejecución a `OperatingSystemArqGetAll`.
	 * @param {OperatingSystemArqFilters} filters - Los filtros a aplicar en la búsqueda.
	 * @returns {Promise<import('@/entities/shared/domain/methods/Response').Response<import('../domain/dto/OperatingSystemArq.dto').OperatingSystemArqDto>>} Una promesa que se resuelve con la respuesta de la búsqueda.
	 */	async search({
		pageNumber,
		pageSize,
		orderBy,
		orderType,
		...options
	}: OperatingSystemArqFilters) {
		const queryParams = await createOperatingSystemArqParams({
			...options,
			pageNumber,
			pageSize,
			orderBy,
			orderType
		})

		return await this.getAll.execute(queryParams)
	}
}