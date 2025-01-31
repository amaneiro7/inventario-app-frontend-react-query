import { MainCategoryOptions } from '@/core/mainCategory/domain/entity/MainCategoryOptions'
import { type MainCategoryId } from '@/core/mainCategory/domain/value-object/MainCategorydId'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'

export function isPartsCategory(mainCategory: Primitives<MainCategoryId>): boolean {
	return mainCategory === MainCategoryOptions.PARTS
}
