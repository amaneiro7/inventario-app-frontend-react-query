import { AccessPolicyGetAll } from './AccessPolicyGetAll'
import { type AccessPolicyFilters, createAccessPolicyParams } from './createAccessPolicyQueryParams'
import { type AccessPolicyGetAllRepository } from '../domain/repository/AccessPolicyGetAllRepository'

/**
 * `AccessPolicyGetByCriteria`
 * @class
 * @description Clase de caso de uso para obtener entidades `AccessPolicy` por criterios de búsqueda.
 * Utiliza `AccessPolicyGetAll` para ejecutar la búsqueda con parámetros construidos dinámicamente.
 */
export class AccessPolicyGetByCriteria {
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
	/**
	 * Campo de ordenación por defecto.
	 * @static
	 * @type {string}
	 */
	static readonly defaultOrderBy: string = 'name'
	private readonly getAll: AccessPolicyGetAll

	/**
	 * Crea una instancia de `AccessPolicyGetByCriteria`.
	 * @param {AccessPolicyGetAllRepository} repository - El repositorio para obtener todas las marcas.
	 */
	constructor(private readonly repository: AccessPolicyGetAllRepository) {
		this.getAll = new AccessPolicyGetAll(this.repository)
	}

	/**
	 * Busca marcas basándose en los filtros proporcionados.
	 * Construye los parámetros de la consulta y delega la ejecución a `AccessPolicyGetAll`.
	 * @param {AccessPolicyFilters} filters - Los filtros a aplicar en la búsqueda.
	 * @param {number} [filters.pageNumber] - El número de página para la paginación.
	 * @param {number} [filters.pageSize] - El tamaño de página para la paginación.
	 * @param {import('@/entities/shared/domain/criteria/OrderBy').Primitives<import('@/entities/shared/domain/criteria/OrderBy').OrderBy>} [filters.orderBy=AccessPolicyGetByCriteria.defaultOrderBy] - El campo por el cual ordenar los resultados.
	 * @param {import('@/entities/shared/domain/criteria/OrderType').Primitives<import('@/entities/shared/domain/criteria/OrderType').OrderType>} [filters.orderType] - El tipo de ordenación (ascendente/descendente).
	 * @param {object} [filters.options] - Otros filtros específicos de la marca.
	 * @returns {Promise<import('@/entities/shared/domain/methods/Response').Response<AccessPolicyDto>>} Una promesa que se resuelve con la respuesta de la búsqueda.
	 */
	async search({
		pageNumber,
		pageSize,
		orderBy = AccessPolicyGetByCriteria.defaultOrderBy,
		orderType,
		...options
	}: AccessPolicyFilters) {
		const queryParams = await createAccessPolicyParams({
			...options,
			pageNumber,
			pageSize,
			orderBy,
			orderType
		})

		return await this.getAll.execute(queryParams)
	}
}
