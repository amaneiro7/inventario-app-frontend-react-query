import { MainCategoryOptions } from '@/entities/mainCategory/domain/entity/MainCategoryOptions'
import { Operator } from '@/entities/shared/domain/criteria/FilterOperators'
import { type SearchByCriteriaQuery } from '@/entities/shared/domain/criteria/SearchByCriteriaQuery'

export const defaultQueries: Record<string, SearchByCriteriaQuery['filters']> = {
	computer: [
		{
			field: 'mainCategoryId',
			operator: Operator.EQUAL,
			value: MainCategoryOptions.COMPUTER
		}
	],
	monitor: [
		{
			field: 'mainCategoryId',
			operator: Operator.EQUAL,
			value: MainCategoryOptions.SCREENS
		}
	],
	printer: [
		{
			field: 'mainCategoryId',
			operator: Operator.EQUAL,
			value: MainCategoryOptions.PRINTERS
		}
	],
	finantialPrinter: [
		{
			field: 'mainCategoryId',
			operator: Operator.EQUAL,
			value: MainCategoryOptions.FINANTIALPRINTER
		}
	],
	parts: [
		{
			field: 'mainCategoryId',
			operator: Operator.EQUAL,
			value: MainCategoryOptions.PARTS
		}
	]
} as const
