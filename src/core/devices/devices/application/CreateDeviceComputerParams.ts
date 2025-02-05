import { Criteria } from '@/core/shared/domain/criteria/Criteria'
import { Operator } from '@/core/shared/domain/criteria/FilterOperators'
import { OrderBy } from '@/core/shared/domain/criteria/OrderBy'
import { OrderType } from '@/core/shared/domain/criteria/OrderType'
import { SearchByCriteriaQuery } from '@/core/shared/domain/criteria/SearchByCriteriaQuery'
import { Primitives } from '@/core/shared/domain/value-objects/Primitives'

export interface DeviceComputerFilters {
	options: {
		categoryId?: string
		mainCategoryId?: string
		brandId?: string
		statusId?: string
		activo?: string
		serial?: string
		modelId?: string
		employeeId?: string
		locationId?: string
		typeOfSiteId?: string
		cityId?: string
		stateId?: string
		regionId?: string
		computerName?: string
		operatingSystemId?: string
		operatingSystemArqId?: string
		ipAddress?: string
		processor?: string
	}
	pageNumber?: number
	pageSize?: number
	orderBy?: Primitives<OrderBy>
	orderType?: Primitives<OrderType>
}

export async function createDeviceQueryParams({
	options,
	pageNumber,
	pageSize,
	orderBy,
	orderType
}: DeviceComputerFilters): Promise<string> {
	const query: SearchByCriteriaQuery = {
		filters: [],
		pageNumber,
		pageSize,
		orderBy,
		orderType
	}

	if (options.categoryId) {
		query.filters.push({
			field: 'categoryId',
			operator: Operator.EQUAL,
			value: options.categoryId
		})
	}
	if (options.brandId) {
		query.filters.push({
			field: 'brandId',
			operator: Operator.EQUAL,
			value: options.brandId
		})
	}
	if (options.statusId) {
		query.filters.push({
			field: 'statusId',
			operator: Operator.EQUAL,
			value: options.statusId
		})
	}
	if (options.activo) {
		query.filters.push({
			field: 'activo',
			operator: Operator.CONTAINS,
			value: options.activo
		})
	}
	if (options.serial) {
		query.filters.push({
			field: 'serial',
			operator: Operator.CONTAINS,
			value: options.serial
		})
	}
	if (options.modelId) {
		query.filters.push({
			field: 'modelId',
			operator: Operator.EQUAL,
			value: options.modelId
		})
	}
	if (options.employeeId) {
		query.filters.push({
			field: 'employeeId',
			operator: Operator.EQUAL,
			value: options.employeeId
		})
	}
	if (options.locationId) {
		query.filters.push({
			field: 'locationId',
			operator: Operator.EQUAL,
			value: options.locationId
		})
	}
	if (options.typeOfSiteId) {
		query.filters.push({
			field: 'typeOfSiteId',
			operator: Operator.EQUAL,
			value: options.typeOfSiteId
		})
	}
	if (options.cityId) {
		query.filters.push({
			field: 'cityId',
			operator: Operator.EQUAL,
			value: options.cityId
		})
	}
	if (options.stateId) {
		query.filters.push({
			field: 'stateId',
			operator: Operator.EQUAL,
			value: options.stateId
		})
	}
	if (options.regionId) {
		query.filters.push({
			field: 'regionId',
			operator: Operator.EQUAL,
			value: options.regionId
		})
	}
	if (options.computerName) {
		query.filters.push({
			field: 'computerName',
			operator: Operator.CONTAINS,
			value: options.computerName
		})
	}
	if (options.operatingSystemId) {
		query.filters.push({
			field: 'operatingSystemId',
			operator: Operator.EQUAL,
			value: options.operatingSystemId
		})
	}
	if (options.operatingSystemArqId) {
		query.filters.push({
			field: 'operatingSystemArqId',
			operator: Operator.EQUAL,
			value: options.operatingSystemArqId
		})
	}
	if (options.ipAddress) {
		query.filters.push({
			field: 'ipAddress',
			operator: Operator.CONTAINS,
			value: options.ipAddress
		})
	}
	if (options.processor) {
		query.filters.push({
			field: 'processor',
			operator: Operator.CONTAINS,
			value: options.processor
		})
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
