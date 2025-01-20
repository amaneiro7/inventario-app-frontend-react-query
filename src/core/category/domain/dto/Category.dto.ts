import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type CategoryId } from '../value-object/CategorydId'
import { type CategoryPrimitives } from './CategoryPrimitives.dto'

export type CategoryDTO = CategoryPrimitives & {
    id: Primitives<CategoryId>
}