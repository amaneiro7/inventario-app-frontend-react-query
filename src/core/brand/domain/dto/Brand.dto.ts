import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type BrandId } from '../value-object/BrandId'
import { type BrandName } from '../value-object/BrandName'
import { type CategoryId } from '@/core/category/domain/value-object/CategorydId'
import { type Category } from '@/core/category/domain/dto/Category.dto'

export interface Brand {
	id: Primitives<BrandId>
	name: Primitives<BrandName>
}

export type BrandParams = BrandPrimitives & {
	id?: Primitives<BrandId> | undefined
	categories: Primitives<CategoryId>[]
}

export type BrandPrimitives = Omit<Brand, 'id'> & {
	categories: Primitives<CategoryId>[]
}

export type BrandDto = Brand & {
	categories: Category[]
	updatedAt: string
}
