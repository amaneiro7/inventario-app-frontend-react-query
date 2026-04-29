import { Criteria } from '@/entities/shared/domain/criteria/Criteria'
import { Operator } from '@/entities/shared/domain/criteria/FilterOperators'
import { OrderBy } from '@/entities/shared/domain/criteria/OrderBy'
import { OrderType } from '@/entities/shared/domain/criteria/OrderType'
import { type SearchByCriteriaQuery } from '@/entities/shared/domain/criteria/SearchByCriteriaQuery'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'

/**
 * @interface ComputerCountBrandDashboardFilters
 * @description Define la estructura  de los posibles filtros para la búsqueda de computadoras por marca.
 * Cada propiedad es opcional y representa un criterio de filtrado específico.
 */
export interface ComputerCountBrandDashboardFilters {
	modelName?: string
	categoryId?: string
	brandId?: string
	statusId?: string
	modelId?: string
	locationId?: string
	typeOfSiteId?: string
	cityId?: string
	siteId?: string
	stateId?: string
	regionId?: string
	administrativeRegionId?: string
	pageNumber?: number
	pageSize?: number
	orderBy?: Primitives<OrderBy>
	orderType?: Primitives<OrderType>
}

/**
 * @async
 * @function createDeviceQueryParams
 * @description Genera una cadena de consulta (query string) basada en los filtros proporcionados para la búsqueda de dispositivos.
 * Esta función es centralizada y maneja los filtros comunes para diferentes tipos de dispositivos.
 * Utiliza la clase `Criteria` del dominio para construir la consulta.
 *
 * @param {DeviceBaseFilters} filters - Un objeto que contiene los criterios de filtrado, paginación y ordenamiento.
 * @param {string[]} [fieldsToContain=[]] - Un array de nombres de campos que deben usar el operador `CONTAINS`.
 * @returns {Promise<string>} Una promesa que resuelve a la cadena de consulta formateada para ser utilizada en una URL.
 */
export async function createComputerCountBrandQueryParams({
	pageNumber,
	pageSize,
	orderBy,
	orderType,
	...options
}: ComputerCountBrandDashboardFilters): Promise<string> {
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
					operator: key === 'modelName' ? Operator.CONTAINS : Operator.EQUAL,
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
