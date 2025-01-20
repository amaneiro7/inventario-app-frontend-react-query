import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type MainCategoryId } from '../value-object/MainCategorydId'
import { type MainCategoryPrimitives } from './MainCategoryPrimitives.dto'

export type MainCategory = MainCategoryPrimitives & {
  id: Primitives<MainCategoryId>
}

export type MainCategoryDTO = MainCategoryPrimitives
