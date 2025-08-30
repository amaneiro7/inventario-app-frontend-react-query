import { ShipmentGetAll } from './ShipmentGetAll'
import { type ShipmentFilters, createShipmentParams } from './createShipmentQueryParams'
import { type ShipmentGetAllRepository } from '../domain/repository/ShipmentGetAllRepository'

/**
 * `ShipmentGetByCriteria`
 * @class
 * @description Clase de caso de uso para obtener entidades `Shipment` por criterios de búsqueda.
 * Utiliza `ShipmentGetAll` para ejecutar la búsqueda con parámetros construidos dinámicamente.
 */
export class ShipmentGetByCriteria {
	/**
	 * Opciones de tamaño de página disponibles para la paginación.
	 * @static
	 * @type {number[]}
	 */ static readonly pageSizeOptions: number[] = [10, 25, 50, 100]
	/**
	 * Tamaño de página por defecto.
	 * @static
	 * @type {number}
	 */ static readonly defaultPageSize: number = 25
	/**
	 * Campo de ordenación por defecto.
	 * @static
	 * @type {string}
	 */ static readonly defaultOrderBy: string = 'name'
	private readonly getAll: ShipmentGetAll

	/**
	 * Crea una instancia de `ShipmentGetByCriteria`.
	 * @param {ShipmentGetAllRepository} repository - El repositorio para obtener todas las marcas.
	 */ constructor(private readonly repository: ShipmentGetAllRepository) {
		this.getAll = new ShipmentGetAll(this.repository)
	}

	/**
	 * Busca marcas basándose en los filtros proporcionados.
	 * Construye los parámetros de la consulta y delega la ejecución a `ShipmentGetAll`.
	 * @param {ShipmentFilters} filters - Los filtros a aplicar en la búsqueda.
	 * @param {number} [filters.pageNumber] - El número de página para la paginación.
	 * @param {number} [filters.pageSize] - El tamaño de página para la paginación.
	 * @param {import('@/entities/shared/domain/criteria/OrderBy').Primitives<import('@/entities/shared/domain/criteria/OrderBy').OrderBy>} [filters.orderBy=ShipmentGetByCriteria.defaultOrderBy] - El campo por el cual ordenar los resultados.
	 * @param {import('@/entities/shared/domain/criteria/OrderType').Primitives<import('@/entities/shared/domain/criteria/OrderType').OrderType>} [filters.orderType] - El tipo de ordenación (ascendente/descendente).
	 * @param {object} [filters.options] - Otros filtros específicos de la marca.
	 * @returns {Promise<import('@/entities/shared/domain/methods/Response').Response<ShipmentDto>>} Una promesa que se resuelve con la respuesta de la búsqueda.
	 */ async search({
		pageNumber,
		pageSize,
		orderBy = ShipmentGetByCriteria.defaultOrderBy,
		orderType,
		...options
	}: ShipmentFilters) {
		const queryParams = await createShipmentParams({
			...options,
			pageNumber,
			pageSize,
			orderBy,
			orderType
		})

		return await this.getAll.execute(queryParams)
	}
}
