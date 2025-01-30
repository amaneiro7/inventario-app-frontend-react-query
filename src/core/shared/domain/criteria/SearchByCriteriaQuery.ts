import { type FiltersPrimitives } from '../../domain/criteria/Filter'
import { type OrderBy } from '../../domain/criteria/OrderBy'
import { type OrderType } from '../../domain/criteria/OrderType'
import { type Primitives } from '../value-objects/Primitives'

export class SearchByCriteriaQuery {
	constructor(
		public filters: FiltersPrimitives[],
		public orderBy?: Primitives<OrderBy>,
		public orderType?: Primitives<OrderType>,
		public pageSize?: number,
		public pageNumber?: number
	) {}
}
