import { type ProcessorGetAllRepository } from '../domain/repository/ProcessorGetAllRepository'
import { ProcessorGetAll } from './ProcessorGetAll'
import { createProcessorParams, type ProcessorFilters } from './createProcessorQueryParams'

/**
 * @class ProcessorGetByCriteria
 * @description Clase de caso de uso para obtener entidades `Processor` por criterios de búsqueda.
 * Utiliza `ProcessorGetAll` para ejecutar la búsqueda con parámetros construidos dinámicamente.
 */
export class ProcessorGetByCriteria {
	private readonly getAll: ProcessorGetAll

	/**
	 * Crea una instancia de `ProcessorGetByCriteria`.
	 * @param {ProcessorGetAllRepository} repository - El repositorio para obtener todos los procesadores.
	 */ constructor(private readonly repository: ProcessorGetAllRepository) {
		this.getAll = new ProcessorGetAll(this.repository)
	}

	/**
	 * Busca procesadores basándose en los filtros proporcionados.
	 * Construye los parámetros de la consulta y delega la ejecución a `ProcessorGetAll`.
	 * @param {ProcessorFilters} filters - Los filtros a aplicar en la búsqueda.
	 * @returns {Promise<import('@/entities/shared/domain/methods/Response').Response<import('../domain/dto/Processor.dto').ProcessorDto>>} Una promesa que se resuelve con la respuesta de la búsqueda.
	 */ async search({ pageNumber, pageSize, orderBy, orderType, ...options }: ProcessorFilters) {
		const queryParams = await createProcessorParams({
			...options,
			pageNumber,
			pageSize,
			orderBy,
			orderType
		})

		return await this.getAll.execute(queryParams)
	}
}
