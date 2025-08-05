import { Criteria } from '@/entities/shared/domain/criteria/Criteria'
import { Operator } from '@/entities/shared/domain/criteria/FilterOperators'
import { OrderBy } from '@/entities/shared/domain/criteria/OrderBy'
import { OrderType } from '@/entities/shared/domain/criteria/OrderType'
import { defaultQueries } from './defaultQueries'
import { type SearchByCriteriaQuery } from '@/entities/shared/domain/criteria/SearchByCriteriaQuery'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'

/**
 * @interface DeviceBaseFilters
 * @description Define la estructura base de los posibles filtros para la búsqueda de dispositivos.
 * Cada propiedad es opcional y representa un criterio de filtrado específico.
 */
export interface DeviceBaseFilters {
	categoryId?: string
	brandId?: string
	statusId?: string
	activo?: string
	serial?: string
	modelId?: string
	employeeId?: string
	locationId?: string
	typeOfSiteId?: string
	vicepresidenciaEjecutivaId?: string
	vicepresidenciaId?: string
	directivaId?: string
	departamentoId?: string
	cargoId?: string
	cityId?: string
	stateId?: string
	regionId?: string
	administrativeRegionId?: string
	pageNumber?: number
	pageSize?: number
	orderBy?: Primitives<OrderBy>
	orderType?: Primitives<OrderType>
	defaultQuery?: keyof typeof defaultQueries
	// Campos específicos de computadora
	computerName?: string
	operatingSystemId?: string
	operatingSystemArqId?: string
	hardDriveTypeId?: string
	memoryRamTypeId?: string
	ipAddress?: string
	processor?: string
	memoryRamCapacity?: string
	memoryRamCapacityOperator?: Operator
	hardDriveCapacity?: string
	hardDriveCapacityOperator?: Operator
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
export async function createDeviceQueryParams(
	{ pageNumber, pageSize, orderBy, orderType, defaultQuery, ...filters }: DeviceBaseFilters,
	fieldsToContain: string[] = []
): Promise<string> {
	const query: SearchByCriteriaQuery = {
		filters: defaultQuery ? [...defaultQueries[defaultQuery]] : [],
		pageSize,
		pageNumber,
		orderBy,
		orderType
	}

	for (const [key, value] of Object.entries(filters)) {
		if (value === undefined || value === null || value === '') {
			const index = query.filters.findIndex(filter => filter.field === key)
			if (index !== -1) {
				query.filters.splice(index, 1)
			}
			continue
		}

		const index = query.filters.findIndex(filter => filter.field === key)
		let operator = Operator.EQUAL

		if (fieldsToContain.includes(key)) {
			operator = Operator.CONTAINS
		} else if (key.endsWith('Operator')) {
			const targetField = key.replace('Operator', '')
			const targetIndex = query.filters.findIndex(f => f.field === targetField)
			if (targetIndex !== -1) {
				query.filters[targetIndex].operator = value as Operator
				continue
			}
			continue
		}

		const newFilter = { field: key, operator, value }
		if (index !== -1) {
			query.filters[index] = newFilter
		} else {
			query.filters.push(newFilter)
		}
	}

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
