import { Criteria } from '@/core/shared/domain/criteria/Criteria'
import { Operator } from '@/core/shared/domain/criteria/FilterOperators'
import { OrderBy } from '@/core/shared/domain/criteria/OrderBy'
import { OrderType } from '@/core/shared/domain/criteria/OrderType'
import { defaultQueries } from '../defaultQueries'
import { type SearchByCriteriaQuery } from '@/core/shared/domain/criteria/SearchByCriteriaQuery'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
/**
 * @interface DeviceComputerFilters
 * @description Define la estructura de los posibles filtros para la búsqueda de dispositivos de cómputo.
 * Cada propiedad es opcional y representa un criterio de filtrado específico.
 */
export interface DeviceComputerFilters {
	categoryId?: string
	brandId?: string
	statusId?: string
	activo?: string
	serial?: string
	modelId?: string
	memoryRamCapacity?: string
	memoryRamCapacityOperator?: Operator
	hardDriveCapacity?: string
	hardDriveCapacityOperator?: Operator
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
	administrativeRegionId?: string
	regionId?: string
	computerName?: string
	operatingSystemId?: string
	operatingSystemArqId?: string
	hardDriveTypeId?: string
	memoryRamTypeId?: string
	ipAddress?: string
	processor?: string
	pageNumber?: number
	pageSize?: number
	orderBy?: Primitives<OrderBy>
	orderType?: Primitives<OrderType>
	defaultQuery?: keyof typeof defaultQueries
}
/**
 * @async
 * @function createDeviceQueryParams
 * @description Genera una cadena de consulta (query string) basada en los filtros proporcionados para la búsqueda de dispositivos de cómputo.
 * Utiliza la clase `Criteria` del dominio para construir la consulta.
 *
 * @param {DeviceComputerFilters} filters - Un objeto que contiene los criterios de filtrado, paginación y ordenamiento.
 * Los campos coinciden con las propiedades de `DeviceComputerFilters`.
 *
 * @returns {Promise<string>} Una promesa que resuelve a la cadena de consulta formateada para ser utilizada en una URL.
 *
 * @example
 * const queryParams = await createDeviceQueryParams({
 * categoryId: 'some-category-id',
 * statusId: 'active',
 * pageSize: 20,
 * pageNumber: 1,
 * orderBy: { field: 'computerName' },
 * orderType: 'asc'
 * });
 * // queryParams será algo como "?filters=[{\"field\":\"categoryId\",\"operator\":\"=\",\"value\":\"some-category-id\"},{\"field\":\"statusId\",\"operator\":\"=\",\"value\":\"active\"}]&orderBy=computerName&orderType=asc&pageSize=20&pageNumber=1"
 */
export async function createDeviceQueryParams({
	pageNumber,
	pageSize,
	orderBy,
	orderType,
	defaultQuery,
	...filters
}: DeviceComputerFilters): Promise<string> {
	/**
	 * @type {SearchByCriteriaQuery}
	 * @description Objeto que contendrá la estructura de la consulta basada en criterios.
	 */
	const query: SearchByCriteriaQuery = {
		filters: defaultQuery ? [...defaultQueries[defaultQuery]] : [], // Inicializa los filtros con la consulta por defecto si se proporciona. Se crea una copia para evitar modificaciones inesperadas.
		pageSize,
		pageNumber,
		orderBy,
		orderType
	}
	/**
	 * @description Itera sobre las propiedades del objeto `filters` (que contiene los criterios de filtrado específicos).
	 * Para cada propiedad, determina cómo se debe agregar o actualizar el filtro en la `query.filters`.
	 */
	for (const [key, value] of Object.entries(filters)) {
		/**
		 * @description Si el valor del filtro es `undefined`, `null` o una cadena vacía,
		 * se busca si ya existe un filtro con esa clave y se elimina.
		 */
		if (value === undefined || value === null || value === '') {
			const index = query.filters.findIndex(filter => filter.field === key)
			if (index !== -1) {
				query.filters.splice(index, 1)
			}
			continue // Saltar a la siguiente iteración si el valor no es válido
		}

		const index = query.filters.findIndex(filter => filter.field === key)
		let operator = Operator.EQUAL // Operador por defecto para la mayoría de los campos.

		/**
		 * @description Define operadores específicos para ciertos campos que generalmente se buscan por contenido.
		 */
		if (
			key === 'serial' ||
			key === 'activo' ||
			key === 'computerName' ||
			key === 'ipAddress' ||
			key === 'processor'
		) {
			operator = Operator.CONTAINS
		} else if (key === 'memoryRamCapacityOperator') {
			/**
			 * @description Si la clave es 'memoryRamCapacityOperator', busca el filtro correspondiente de 'memoryRamCapacity'
			 * y actualiza su operador. Si no existe el filtro de capacidad, se ignora el operador.
			 */
			const capacityIndex = query.filters.findIndex(f => f.field === 'memoryRamCapacity')
			if (capacityIndex !== -1) {
				query.filters[capacityIndex].operator = value as Operator
				continue
			}
			continue // No tiene sentido si no hay 'memoryRamCapacity'
		} else if (key === 'hardDriveCapacityOperator') {
			/**
			 * @description Similar a 'memoryRamCapacityOperator', pero para la capacidad del disco duro.
			 */
			const capacityIndex = query.filters.findIndex(f => f.field === 'hardDriveCapacity')
			if (capacityIndex !== -1) {
				query.filters[capacityIndex].operator = value as Operator
				continue
			}
			continue // No tiene sentido si no hay 'hardDriveCapacity'
		}

		/**
		 * @type {{ field: string; operator: Operator; value: any }}
		 * @description Crea un nuevo objeto de filtro.
		 */
		const newFilter = { field: key, operator, value }
		/**
		 * @description Si ya existía un filtro con esta clave, lo actualiza. Si no, agrega uno nuevo.
		 */
		if (index !== -1) {
			query.filters[index] = newFilter
		} else {
			query.filters.push(newFilter)
		}
	}

	/**
	 * @const {Criteria} criteria
	 * @description Crea una instancia de la clase `Criteria` utilizando los filtros, ordenamiento y paginación construidos.
	 */
	const criteria = Criteria.fromValues(
		query.filters,
		query.orderBy,
		query.orderType,
		query.pageSize,
		query.pageNumber
	)
	/**
	 * @const {string} queryParams
	 * @description Construye la cadena de consulta a partir del objeto `Criteria`.
	 */
	const queryParams = criteria.buildQuery(criteria)

	return queryParams
}
