import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type MainCategoryId } from '../value-object/MainCategoryId'
import { MainCategoryName } from '../value-object/MainCategoryName'

export interface MainCategory {
	id: Primitives<MainCategoryId>
	name: Primitives<MainCategoryName>
}

export type MainCategoryPrimitives = Omit<MainCategory, 'id'>

export type MainCategoryDto = MainCategory
