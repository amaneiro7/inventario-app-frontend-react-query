import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type MainCategoryId } from '../value-object/MainCategorydId'
import { MainCategoryName } from '../value-object/MainCategoryName'

export interface MainCategory {
  id: Primitives<MainCategoryId>
  name: Primitives<MainCategoryName>
}

export type MainCategoryPrimitives = Omit<MainCategory, 'id'>

export type MainCategoryDTO = MainCategory
