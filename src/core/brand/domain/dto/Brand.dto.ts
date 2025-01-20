import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type BrandId } from '../value-object/BrandId'
import { type BrandName } from '../value-object/BrandName'

export interface Brand {
  id: Primitives<BrandId>
  name: Primitives<BrandName>
}

export type BrandPrimitives = Omit<Brand, 'id'>

export type BrandDto = Brand
