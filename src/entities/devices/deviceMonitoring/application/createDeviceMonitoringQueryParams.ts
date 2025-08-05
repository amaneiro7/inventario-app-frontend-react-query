import { Criteria } from '@/entities/shared/domain/criteria/Criteria'
import { Operator } from '@/entities/shared/domain/criteria/FilterOperators'
import { OrderBy } from '@/entities/shared/domain/criteria/OrderBy'
import { OrderType } from '@/entities/shared/domain/criteria/OrderType'
import { type SearchByCriteriaQuery } from '@/entities/shared/domain/criteria/SearchByCriteriaQuery'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type DeviceMonitoringDto } from '../domain/dto/DeviceMonitoring.dto'

/**
 * @interface DeviceMonitoringFilters
 * @description Define la estructura de los filtros disponibles para buscar entidades `DeviceMonitoring`.
 * @property {DeviceMonitoringDto['id']} [id] - ID de la monitorización del dispositivo.
 * @property {DeviceMonitoringDto['status']} [status] - Estado de la monitorización del dispositivo.
 * @property {DeviceMonitoringDto['ipAddress']} [ipAddress] - Dirección IP del dispositivo.
 * @property {DeviceMonitoringDto['computerName']} [computerName] - Nombre del equipo del dispositivo.
 * @property {string} [locationId] - ID de la ubicación del dispositivo.
 * @property {string} [typeOfSiteId] - ID del tipo de sitio del dispositivo.
 * @property {string} [siteId] - ID del sitio del dispositivo.
 * @property {string} [cityId] - ID de la ciudad del dispositivo.
 * @property {string} [stateId] - ID del estado del dispositivo.
 * @property {string} [regionId] - ID de la región del dispositivo.
 * @property {string} [administrativeRegionId] - ID de la región administrativa del dispositivo.
 * @property {number} [pageNumber] - Número de página para la paginación.
 * @property {number} [pageSize] - Tamaño de página para la paginación.
 * @property {Primitives<OrderBy>} [orderBy] - Campo por el cual ordenar los resultados.
 * @property {Primitives<OrderType>} [orderType] - Tipo de ordenación (ascendente/descendente).
 */
export interface DeviceMonitoringFilters {
	id?: DeviceMonitoringDto['id']
	status?: DeviceMonitoringDto['status']
	ipAddress?: DeviceMonitoringDto['ipAddress']
	computerName?: DeviceMonitoringDto['computerName']
	locationId?: string
	typeOfSiteId?: string
	siteId?: string
	cityId?: string
	stateId?: string
	regionId?: string
	administrativeRegionId?: string
	pageNumber?: number
	pageSize?: number
	orderBy?: Primitives<OrderBy>
	orderType?: Primitives<OrderType>
}

/**
 * `createDeviceMonitoringParams`
 * @function
 * @description Construye una cadena de parámetros de consulta (query string) a partir de un objeto `DeviceMonitoringFilters`.
 * Utiliza la clase `Criteria` para generar la consulta de forma estructurada.
 * @param {DeviceMonitoringFilters} filters - El objeto de filtros para construir los parámetros de consulta.
 * @returns {Promise<string>} Una promesa que se resuelve con la cadena de parámetros de consulta.
 */
export async function createDeviceMonitoringParams({
	pageNumber,
	pageSize,
	orderBy,
	orderType,
	...options
}: DeviceMonitoringFilters): Promise<string> {
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
						key === 'ipAddress' || key === 'computerName'
							? Operator.CONTAINS
							: Operator.EQUAL,
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