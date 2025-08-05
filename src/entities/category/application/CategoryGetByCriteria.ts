import { CategoryGetAll } from './CategoryGetAll'
import { type CategoryGetAllRepository } from '../domain/repository/CategoryGetAllRepository'
import { createCategoryParams, type CategoryFilters } from './CreateCategoryQueryParams'

/**
 * `CategoryGetByCriteria`
 * @class
 * @description Clase de caso de uso para obtener entidades `Category` por criterios de búsqueda.
 * Utiliza `CategoryGetAll` para ejecutar la búsqueda con parámetros construidos dinámicamente.
 */
export class CategoryGetByCriteria {
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
	/**
	 * Campo de ordenación por defecto.
	 * @static
	 * @type {string}
	 */	static readonly defaultOrderBy = 'name'
	private readonly getAll: CategoryGetAll

	/**
	 * Crea una instancia de `CategoryGetByCriteria`.
	 * @param {CategoryGetAllRepository} repository - El repositorio para obtener todas las categorías.
	 */	constructor(private readonly repository: CategoryGetAllRepository) {
		this.getAll = new CategoryGetAll(this.repository)
	}

	/**
	 * Busca categorías basándose en los filtros proporcionados.
	 * Construye los parámetros de la consulta y delega la ejecución a `CategoryGetAll`.
	 * @param {CategoryFilters} filters - Los filtros a aplicar en la búsqueda.
	 * @param {number} [filters.pageNumber=1] - El número de página para la paginación.
	 * @param {number} [filters.pageSize=CategoryGetByCriteria.defaultPageSize] - El tamaño de página para la paginación.
	 * @param {import('@/entities/shared/domain/criteria/OrderBy').Primitives<import('@/entities/shared/domain/criteria/OrderBy').OrderBy>} [filters.orderBy] - El campo por el cual ordenar los resultados.
	 * @param {import('@/entities/shared/domain/criteria/OrderType').Primitives<import('@/entities/shared/domain/criteria/OrderType').OrderType>} [filters.orderType] - El tipo de ordenación (ascendente/descendente).
	 * @param {object} [filters.options] - Otros filtros específicos de la categoría.
	 * @returns {Promise<import('@/entities/shared/domain/methods/Response').Response<CategoryDto>>} Una promesa que se resuelve con la respuesta de la búsqueda.
	 */	async search({
		pageNumber = 1,
		pageSize = CategoryGetByCriteria.defaultPageSize,
		orderBy,
		orderType,
		...options
	}: CategoryFilters) {
		const queryParams = await createCategoryParams({
			...options,
			pageNumber,
			pageSize,
			orderBy,
			orderType
		})

		return await this.getAll.execute(queryParams)
	}
}