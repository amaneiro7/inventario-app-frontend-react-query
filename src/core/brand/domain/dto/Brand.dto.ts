import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type BrandId } from '../value-object/BrandId'
import { type BrandPrimitives } from './BrandPrimitives.dto'

export type BrandDTO = BrandPrimitives & {
    id: Primitives<BrandId>
}