import { Criteria } from '@/core/shared/domain/criteria/Criteria'
import { Operator } from '@/core/shared/domain/criteria/FilterOperators'
import { OrderBy } from '@/core/shared/domain/criteria/OrderBy'
import { OrderType } from '@/core/shared/domain/criteria/OrderType'
import { type SearchByCriteriaQuery } from '@/core/shared/domain/criteria/SearchByCriteriaQuery'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type HistoryDto } from '../domain/dto/History.dto'
import { HistoryGetByCriteria } from './HistoryGetByCriteria'

export interface HistoryFilters {
	deviceId?: HistoryDto['deviceId']
	employeeId?: HistoryDto['employeeId']
	userId?: HistoryDto['userId']
	updatedAt?: HistoryDto['updatedAt']
	startDate?: HistoryDto['updatedAt']
	endDate?: HistoryDto['updatedAt']
	action?: HistoryDto['action']
	pageNumber?: number
	pageSize?: number
	orderBy?: Primitives<OrderBy>
	orderType?: Primitives<OrderType>
}

export async function createHistoryParams({
	pageNumber,
	pageSize,
	orderBy,
	orderType,
	...options
}: HistoryFilters): Promise<string> {
	const query: SearchByCriteriaQuery = {
		filters: [],
		pageSize,
		pageNumber,
		orderBy: orderBy ?? HistoryGetByCriteria.defaultOrderBy,
		orderType: !orderBy && !orderType ? HistoryGetByCriteria.defaultOrderType : orderType
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
						key === 'name'
							? Operator.CONTAINS
							: key === 'startDate'
								? Operator.GREATER_THAN_OR_EQUAL
								: key === 'endDate'
									? Operator.LOWER_THAN_OR_EQUAL
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
