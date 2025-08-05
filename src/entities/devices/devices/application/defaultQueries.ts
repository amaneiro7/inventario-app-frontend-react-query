import { MainCategoryOptions } from '@/entities/mainCategory/domain/entity/MainCategoryOptions'
import { Operator } from '@/entities/shared/domain/criteria/FilterOperators'
import { type SearchByCriteriaQuery } from '@/entities/shared/domain/criteria/SearchByCriteriaQuery'

/**
 * @constant {Record<string, SearchByCriteriaQuery['filters']>} defaultQueries
 * @description Objeto que contiene conjuntos de filtros predefinidos para diferentes tipos de dispositivos.
 * Estos filtros se utilizan como base para las consultas de búsqueda.
 */
export const defaultQueries: Record<string, SearchByCriteriaQuery['filters']> = {
	/**
	 * Filtros por defecto para dispositivos de tipo 'computadora'.
	 */	computer: [
		{
			field: 'mainCategoryId',
			operator: Operator.EQUAL,
			value: MainCategoryOptions.COMPUTER
		}
	],
	/**
	 * Filtros por defecto para dispositivos de tipo 'monitor'.
	 */	monitor: [
		{
			field: 'mainCategoryId',
			operator: Operator.EQUAL,
			value: MainCategoryOptions.SCREENS
		}
	],
	/**
	 * Filtros por defecto para dispositivos de tipo 'impresora'.
	 */	printer: [
		{
			field: 'mainCategoryId',
			operator: Operator.EQUAL,
			value: MainCategoryOptions.PRINTERS
		}
	],
	/**
	 * Filtros por defecto para dispositivos de tipo 'impresora financiera'.
	 */	finantialPrinter: [
		{
			field: 'mainCategoryId',
			operator: Operator.EQUAL,
			value: MainCategoryOptions.FINANTIALPRINTER
		}
	],
	/**
	 * Filtros por defecto para dispositivos de tipo 'partes y piezas'.
	 */	parts: [
		{
			field: 'mainCategoryId',
			operator: Operator.EQUAL,
			value: MainCategoryOptions.PARTS
		}
	]
} as const