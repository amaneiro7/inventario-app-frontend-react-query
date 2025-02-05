import { MainCategoryOptions } from '@/core/mainCategory/domain/entity/MainCategoryOptions'
import { Operator } from '@/core/shared/domain/criteria/FilterOperators'
import { OrderTypes } from '@/core/shared/domain/criteria/OrderType'
import { SearchByCriteriaQuery } from '@/core/shared/domain/criteria/SearchByCriteriaQuery'

export const defaultQueries: Record<string, SearchByCriteriaQuery> = {
	computer: {
		filters: [
			{
				field: 'mainCategoryId',
				operator: Operator.EQUAL,
				value: MainCategoryOptions.COMPUTER
			}
		],
		orderBy: 'employeeId',
		orderType: OrderTypes.ASC
	},
	monitor: {
		filters: [
			{
				field: 'mainCategoryId',
				operator: Operator.EQUAL,
				value: MainCategoryOptions.SCREENS
			}
		],
		orderBy: 'employeeId',
		orderType: OrderTypes.ASC
	},
	printer: {
		filters: [
			{
				field: 'mainCategoryId',
				operator: Operator.EQUAL,
				value: MainCategoryOptions.PRINTERS
			}
		],
		orderBy: 'employeeId',
		orderType: OrderTypes.ASC
	},
	finantialPrinter: {
		filters: [
			{
				field: 'mainCategoryId',
				operator: Operator.EQUAL,
				value: MainCategoryOptions.FINANTIALPRINTER
			}
		],
		orderBy: 'employeeId',
		orderType: OrderTypes.ASC
	},
	parts: {
		filters: [
			{
				field: 'mainCategoryId',
				operator: Operator.EQUAL,
				value: MainCategoryOptions.PARTS
			}
		],
		orderBy: 'employeeId',
		orderType: OrderTypes.ASC
	}
} as const
