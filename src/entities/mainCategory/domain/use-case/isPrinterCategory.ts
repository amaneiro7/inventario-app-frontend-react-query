import { MainCategoryOptions } from '@/entities/mainCategory/domain/entity/MainCategoryOptions'
import { type MainCategoryId } from '@/entities/mainCategory/domain/value-object/MainCategoryId'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'

/**
 * Checks if a given main category ID corresponds to the 'PRINTERS' category.
 * @param mainCategory - The primitive value of the MainCategoryId to check.
 * @returns True if the main category is 'PRINTERS', false otherwise.
 */
export function isPrinterCategory(mainCategory: Primitives<MainCategoryId>): boolean {
	return mainCategory === MainCategoryOptions.PRINTERS
}