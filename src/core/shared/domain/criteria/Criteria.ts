import { FiltersPrimitives, type Filter } from './Filter'
import { Filters } from './Filters'
import { Order } from './Order'
import { type OrderType } from './OrderType'
import { type OrderBy } from './OrderBy'
import { type Primitives } from '../value-objects/Primitives'
import { InvalidCriteria } from './InvalidCriteria'

interface CriteriaPrimitives {
	filters: Filter[]
	orderBy?: Primitives<OrderBy>
	orderType?: Primitives<OrderType>
	pageSize?: number
	pageNumber?: number
}

export class Criteria {
	constructor(
		public readonly filters?: Filters,
		public readonly order?: Order,
		public readonly pageSize?: number,
		public readonly pageNumber?: number
	) {
		if (pageNumber && !pageSize) {
			throw new InvalidCriteria()
		}
	}

	static fromValues(
		filters: FiltersPrimitives[],
		orderBy?: Primitives<OrderBy>,
		orderType?: Primitives<OrderType>,
		pageSize?: number,
		pageNumber?: number
	): Criteria {
		return new Criteria(
			Filters.fromValues(filters),
			Order.fromValues(orderBy, orderType),
			pageSize,
			pageNumber
		)
	}

	toPrimitives(): CriteriaPrimitives {
		return {
			filters: this.filters?.value ?? [],
			orderBy: this.order?.orderBy.value,
			orderType: this.order?.orderType.value,
			pageSize: Number(this.pageSize),
			pageNumber: Number(this.pageNumber)
		}
	}

	buildQuery(criteria: Criteria): string {
		const { filters, orderBy, orderType, pageNumber, pageSize } = criteria.toPrimitives()
		const filtersPrimitives =
			filters.length > 0 &&
			filters.map((filter, index) => {
				const { field, operator, value } = filter.toPrimitives()
				return `filters[${index}][field]=${field}&filters[${index}][operator]=${operator}&filters[${index}][value]=${value}`
			})
		const paramsPageSizeAndPageNumber = pageSize
			? `pageSize=${pageSize}&pageNumber=${pageNumber}`
			: undefined
		const paramsOrder = orderBy ? `orderBy=${orderBy}&orderType=${orderType}` : undefined
		const paramsFilters = filtersPrimitives ? `${filtersPrimitives.join('&')}` : undefined
		const queryParams = [paramsFilters, paramsPageSizeAndPageNumber, paramsOrder].join('&')
		return queryParams
	}
}
