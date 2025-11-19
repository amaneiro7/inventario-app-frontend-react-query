import { Criteria } from '@/entities/shared/domain/criteria/Criteria'
import { Operator } from '@/entities/shared/domain/criteria/FilterOperators'
import { OrderBy } from '@/entities/shared/domain/criteria/OrderBy'
import { OrderType } from '@/entities/shared/domain/criteria/OrderType'
import { type SearchByCriteriaQuery } from '@/entities/shared/domain/criteria/SearchByCriteriaQuery'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type PermissionGroupDto } from '../domain/dto/PermissionGroup.dto'

/**
 * @interface PermissionGroupFilters
 * @description Define la estructura de los filtros disponibles para buscar entidades `PermissionGroup`.
 * @property {PermissionGroupDto['id']} [id] - ID de la marca.
 * @property {PermissionGroupDto['name']} [name] - Nombre de la marca.
 * @property {string} [categoryId] - ID de la categoría asociada a la marca.
 * @property {number} [pageNumber] - Número de página para la paginación.
 * @property {number} [pageSize] - Tamaño de página para la paginación.
 * @property {Primitives<OrderBy>} [orderBy] - Campo por el cual ordenar los resultados.
 * @property {Primitives<OrderType>} [orderType] - Tipo de ordenación (ascendente/descendente).
 */
export interface PermissionGroupFilters {
	id?: PermissionGroupDto['id']
	name?: PermissionGroupDto['name']
	permissionId?: string
	pageNumber?: number
	pageSize?: number
	orderBy?: Primitives<OrderBy>
	orderType?: Primitives<OrderType>
}

/**
 * `createPermissionGroupParams`
 * @function
 * @description Construye una cadena de parámetros de consulta (query string) a partir de un objeto `PermissionGroupFilters`.
 * Utiliza la clase `Criteria` para generar la consulta de forma estructurada.
 * @param {PermissionGroupFilters} filters - El objeto de filtros para construir los parámetros de consulta.
 * @returns {Promise<string>} Una promesa que se resuelve con la cadena de parámetros de consulta.
 */
export async function createPermissionGroupParams({
	pageNumber,
	pageSize,
	orderBy,
	orderType,
	...options
}: PermissionGroupFilters): Promise<string> {
	const query: SearchByCriteriaQuery = {
		filters: [],
		pageSize,
		pageNumber,
		orderBy,
		orderType
	}

	Object.entries(options).forEach(([key, value]) => {
		const index = query.filters.findIndex(filter => filter.field === key)

		if (!value) {
			if (index !== -1) {
				query.filters.splice(index, 1)
			}
		} else {
			if (index !== -1) {
				query.filters[index].value = value
			} else {
				query.filters.push({
					field: key,
					operator: key === 'name' ? Operator.CONTAINS : Operator.EQUAL,
					value
				})
			}
		}
	})

	const criteria = Criteria.fromValues(
		query.filters,
		query.orderBy,
		query.orderType,
		query.pageSize,
		query.pageNumber
	)
	const queryParams = criteria.buildQuery(criteria)

	return queryParams
}
