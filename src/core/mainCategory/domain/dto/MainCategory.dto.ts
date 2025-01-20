import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type MainCategoryId } from '../value-object/MainCategorydId'
import { type MainCategoryPrimitives } from './MainCategoryPrimitives.dto'

export type MainCategoryDTO = MainCategoryPrimitives & {
    id: Primitives<MainCategoryId>
}