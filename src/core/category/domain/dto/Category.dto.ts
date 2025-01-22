import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type CategoryId } from '../value-object/CategorydId'
import { type CategoryName } from '../value-object/CategoryName'
import { type MainCategoryId } from '@/core/mainCategory/domain/value-object/MainCategorydId'
import { type MainCategoryDto } from '@/core/mainCategory/domain/dto/MainCategory.dto'

export interface Category {
	id: Primitives<CategoryId>
	name: Primitives<CategoryName>
	mainCategoryId: Primitives<MainCategoryId>
}

export type CategoryPrimitives = Omit<Category, 'id'>

export type CategoryDto = CategoryPrimitives & {
	mainCategory: MainCategoryDto
}
