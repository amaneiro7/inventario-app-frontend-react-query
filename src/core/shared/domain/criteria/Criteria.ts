import { FiltersPrimitives, type Filter } from './Filter'
import { Filters } from './Filters'
import { Order } from './Order'
import { PageSize } from './PageSize'
import { PageNumber } from './PageNumber'
import { type OrderType } from './OrderType'
import { type OrderBy } from './OrderBy'
import { InvalidCriteria } from './InvalidCriteria'

interface CriteriaPrimitives {
	filters: Filter[]
	orderBy: OrderBy['value'] | null
	orderType: OrderType['value'] | null
	pageSize: PageSize['value'] | null
	pageNumber: PageNumber['value'] | null
}

export class Criteria {
	constructor(
		public readonly filters?: Filters,
		public readonly order?: Order,
		public readonly pageSize?: PageSize | null,
		public readonly pageNumber?: PageNumber | null
	) {
		if (pageNumber && !pageSize) {
			throw new InvalidCriteria()
		}
	}

	static fromValues(
		filters: FiltersPrimitives[],
		orderBy: OrderBy['value'],
		orderType: OrderType['value'],
		pageSize: PageSize['value'] | null,
		pageNumber: PageNumber['value'] | null
	): Criteria {
		return new Criteria(
			Filters.fromValues(filters),
			Order.fromValues(orderBy, orderType),
			pageSize ? new PageSize(pageSize) : null,
			pageNumber ? new PageNumber(pageNumber) : null
		)
	}

	toPrimitives(): CriteriaPrimitives {
		return {
			filters: this.filters?.value ?? [],
			orderBy: this.order?.orderBy.value ?? null,
			orderType: this.order?.orderType.value ?? null,
			pageSize: this.pageSize?.value ?? null,
			pageNumber: this.pageNumber?.value ?? null
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
			? `limit=${pageSize}&offset=${pageNumber}`
			: undefined
		const paramsOrder = orderBy ? `orderBy=${orderBy}&orderType=${orderType}` : undefined
		const paramsFilters = filtersPrimitives ? `${filtersPrimitives.join('&')}` : undefined
		const queryParams = [paramsFilters, paramsPageSizeAndPageNumber, paramsOrder].join('&')
		return queryParams
	}
}
