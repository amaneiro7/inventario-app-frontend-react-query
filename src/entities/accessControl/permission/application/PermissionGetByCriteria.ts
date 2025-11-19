import { PermissionGetAll } from './PermissionGetAll'
import { type PermissionFilters, createPermissionParams } from './createPermissionQueryParams'
import { type PermissionGetAllRepository } from '../domain/repository/PermissionGetAllRepository'

/**
 * `PermissionGetByCriteria`
 * @class
 * @description Clase de caso de uso para obtener entidades `Permission` por criterios de búsqueda.
 * Utiliza `PermissionGetAll` para ejecutar la búsqueda con parámetros construidos dinámicamente.
 */
export class PermissionGetByCriteria {
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
	 */ static readonly defaultOrderBy = 'name'
	private readonly getAll: PermissionGetAll

	/**
	 * Crea una instancia de `PermissionGetByCriteria`.
	 * @param {PermissionGetAllRepository} repository - El repositorio para obtener todas las marcas.
	 */ constructor(private readonly repository: PermissionGetAllRepository) {
		this.getAll = new PermissionGetAll(this.repository)
	}

	/**
	 * Busca marcas basándose en los filtros proporcionados.
	 * Construye los parámetros de la consulta y delega la ejecución a `PermissionGetAll`.
	 * @param {PermissionFilters} filters - Los filtros a aplicar en la búsqueda.
	 * @param {number} [filters.pageNumber] - El número de página para la paginación.
	 * @param {number} [filters.pageSize] - El tamaño de página para la paginación.
	 * @param {import('@/entities/shared/domain/criteria/OrderBy').Primitives<import('@/entities/shared/domain/criteria/OrderBy').OrderBy>} [filters.orderBy=PermissionGetByCriteria.defaultOrderBy] - El campo por el cual ordenar los resultados.
	 * @param {import('@/entities/shared/domain/criteria/OrderType').Primitives<import('@/entities/shared/domain/criteria/OrderType').OrderType>} [filters.orderType] - El tipo de ordenación (ascendente/descendente).
	 * @param {object} [filters.options] - Otros filtros específicos de la marca.
	 * @returns {Promise<import('@/entities/shared/domain/methods/Response').Response<PermissionDto>>} Una promesa que se resuelve con la respuesta de la búsqueda.
	 */ async search({
		pageNumber,
		pageSize,
		orderBy = PermissionGetByCriteria.defaultOrderBy,
		orderType,
		...options
	}: PermissionFilters) {
		const queryParams = await createPermissionParams({
			...options,
			pageNumber,
			pageSize,
			orderBy,
			orderType
		})

		return await this.getAll.execute(queryParams)
	}
}
