import { MainCategoryOptions } from '@/entities/mainCategory/domain/entity/MainCategoryOptions'
import { type MainCategoryId } from '@/entities/mainCategory/domain/value-object/MainCategorydId'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'

export function isComputerCategory(mainCategory: Primitives<MainCategoryId>): boolean {
	return mainCategory === MainCategoryOptions.COMPUTER
}
