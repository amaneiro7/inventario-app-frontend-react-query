import { Criteria } from '@/entities/shared/domain/criteria/Criteria'
import { Operator } from '@/entities/shared/domain/criteria/FilterOperators'
import { OrderBy } from '@/entities/shared/domain/criteria/OrderBy'
import { OrderType } from '@/entities/shared/domain/criteria/OrderType'
import { type SearchByCriteriaQuery } from '@/entities/shared/domain/criteria/SearchByCriteriaQuery'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'

/**
 * @interface EvaluationHardwareDashboardFilters
 * @description Define la estructura de los filtros disponibles para buscar entidades `EvaluationHardware`.
 * @property {EvaluationHardwareDto['id']} [id] - ID de la marca.
 * @property {EvaluationHardwareDto['name']} [name] - Nombre de la marca.
 * @property {string} [categoryId] - ID de la categoría asociada a la marca.
 * @property {number} [pageNumber] - Número de página para la paginación.
 * @property {number} [pageSize] - Tamaño de página para la paginación.
 * @property {Primitives<OrderBy>} [orderBy] - Campo por el cual ordenar los resultados.
 * @property {Primitives<OrderType>} [orderType] - Tipo de ordenación (ascendente/descendente).
 */
export interface EvaluationHardwareDashboardFilters {
	id?: string
	serial?: string
	isApto?: 'true' | 'false'
	isNoApto?: 'true' | 'false'
	isRamApto?: 'true' | 'false'
	isDiskApto?: 'true' | 'false'
	isProcessorApto?: 'true' | 'false'
	modelName?: string
	mainCategoryId?: string
	categoryId?: string
	memoryRamCapacity?: string
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
 * `createEvaluationHardwareDashboardParams`
 * @function
 * @description Construye una cadena de parámetros de consulta (query string) a partir de un objeto `EvaluationHardwareDashboardFilters`.
 * Utiliza la clase `Criteria` para generar la consulta de forma estructurada.
 * @param {EvaluationHardwareDashboardFilters} filters - El objeto de filtros para construir los parámetros de consulta.
 * @returns {Promise<string>} Una promesa que se resuelve con la cadena de parámetros de consulta.
 */
export async function createEvaluationHardwareDashboardParams({
	pageNumber,
	pageSize,
	orderBy,
	orderType,
	...options
}: EvaluationHardwareDashboardFilters): Promise<string> {
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
					operator:
						key === 'name' || key === 'serial' ? Operator.CONTAINS : Operator.EQUAL,
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
