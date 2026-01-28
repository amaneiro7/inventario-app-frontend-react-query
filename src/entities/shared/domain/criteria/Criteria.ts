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
			pageSize: this.pageSize,
			pageNumber: this.pageNumber
		}
	}

	/**
	 * Build a query string given a Criteria object
	 * @param criteria Criteria object
	 * @returns a query string in the format of
	 * 'filters[0][field]=FIELD&filters[0][operator]=OPERATOR&filters[0][value]=VALUE&filters[1][field]=FIELD&filters[1][operator]=OPERATOR&filters[1][value]=VALUE&pageSize=NUMBER&pageNumber=NUMBER&orderBy=FIELD&orderType=ORDER_TYPE'
	 */
	buildQuery(criteria: Criteria): string {
		const { filters, orderBy, orderType, pageNumber, pageSize } = criteria.toPrimitives()

		/**
		 * Build a string array of 'filters[INDEX][field]=FIELD&filters[INDEX][operator]=OPERATOR&filters[INDEX][value]=VALUE'
		 * for each filter element
		 */
		const filtersPrimitives = filters.map((filter, index) => {
			const { field, operator, value } = filter.toPrimitives()

			/**
			 * Build a query string for each filter element
			 * filters[INDEX][field]=FIELD&filters[INDEX][operator]=OPERATOR&filters[INDEX][value]=VALUE
			 */
			return `filters[${index}][field]=${field}&filters[${index}][operator]=${operator}&filters[${index}][value]=${value}`
		})

		/**
		 * Build a query string for the page size and page number
		 * pageSize=NUMBER&pageNumber=NUMBER
		 */
		const paramsPageSizeAndPageNumber =
			pageSize && pageNumber
				? `pageSize=${pageSize}&pageNumber=${pageNumber}`
				: pageSize
					? `pageSize=${pageSize}`
					: undefined

		/**
		 * Build a query string for the order by and order type
		 * orderBy=FIELD&orderType=ORDER_TYPE
		 */
		const paramsOrder = orderBy ? `orderBy=${orderBy}&orderType=${orderType}` : undefined

		/**
		 * Build a query string by joining the query strings for the filters, page size and page number, and order by
		 */

		return [
			filtersPrimitives.length > 0 ? filtersPrimitives.join('&') : undefined,
			paramsPageSizeAndPageNumber,
			paramsOrder
		]
			.filter(Boolean)
			.join('&')
		// const queryParams = [filtersQueryParams.join('&'), paramsPageSizeAndPageNumber, paramsOrder].join('&')

		// return queryParams
	}
}
