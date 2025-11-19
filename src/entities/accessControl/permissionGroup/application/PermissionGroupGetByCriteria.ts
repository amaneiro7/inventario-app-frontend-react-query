import { PermissionGroupGetAll } from './PermissionGroupGetAll'
import {
	type PermissionGroupFilters,
	createPermissionGroupParams
} from './createPermissionGroupQueryParams'
import { type PermissionGroupGetAllRepository } from '../domain/repository/PermissionGroupGetAllRepository'

/**
 * `PermissionGroupGetByCriteria`
 * @class
 * @description Clase de caso de uso para obtener entidades `PermissionGroup` por criterios de búsqueda.
 * Utiliza `PermissionGroupGetAll` para ejecutar la búsqueda con parámetros construidos dinámicamente.
 */
export class PermissionGroupGetByCriteria {
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
	private readonly getAll: PermissionGroupGetAll

	/**
	 * Crea una instancia de `PermissionGroupGetByCriteria`.
	 * @param {PermissionGroupGetAllRepository} repository - El repositorio para obtener todas las marcas.
	 */ constructor(private readonly repository: PermissionGroupGetAllRepository) {
		this.getAll = new PermissionGroupGetAll(this.repository)
	}

	/**
	 * Busca marcas basándose en los filtros proporcionados.
	 * Construye los parámetros de la consulta y delega la ejecución a `PermissionGroupGetAll`.
	 * @param {PermissionGroupFilters} filters - Los filtros a aplicar en la búsqueda.
	 * @param {number} [filters.pageNumber] - El número de página para la paginación.
	 * @param {number} [filters.pageSize] - El tamaño de página para la paginación.
	 * @param {import('@/entities/shared/domain/criteria/OrderBy').Primitives<import('@/entities/shared/domain/criteria/OrderBy').OrderBy>} [filters.orderBy=PermissionGroupGetByCriteria.defaultOrderBy] - El campo por el cual ordenar los resultados.
	 * @param {import('@/entities/shared/domain/criteria/OrderType').Primitives<import('@/entities/shared/domain/criteria/OrderType').OrderType>} [filters.orderType] - El tipo de ordenación (ascendente/descendente).
	 * @param {object} [filters.options] - Otros filtros específicos de la marca.
	 * @returns {Promise<import('@/entities/shared/domain/methods/Response').Response<PermissionGroupDto>>} Una promesa que se resuelve con la respuesta de la búsqueda.
	 */ async search({
		pageNumber,
		pageSize,
		orderBy = PermissionGroupGetByCriteria.defaultOrderBy,
		orderType,
		...options
	}: PermissionGroupFilters) {
		const queryParams = await createPermissionGroupParams({
			...options,
			pageNumber,
			pageSize,
			orderBy,
			orderType
		})

		return await this.getAll.execute(queryParams)
	}
}
