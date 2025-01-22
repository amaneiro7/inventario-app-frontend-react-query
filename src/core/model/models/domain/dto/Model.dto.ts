import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type ModelId } from '../value-object/ModeId'
import { type ModelName } from '../value-object/ModelName'
import { type CategoryId } from '@/core/category/domain/value-object/CategorydId'
import { type BrandId } from '@/core/brand/domain/value-object/BrandId'
import { type GenericModel } from '../value-object/GenericModel'
import { type CategoryDTO } from '@/core/category/domain/dto/Category.dto'
import { type BrandDto } from '@/core/brand/domain/dto/Brand.dto'
import { type CategoryOptions } from '@/core/category/domain/entity/CategoryOptions'

export interface Model {
	id: Primitives<ModelId>
	name: Primitives<ModelName>
	categoryId: Primitives<CategoryId>
	brandId: Primitives<BrandId>
	generic: Primitives<GenericModel>
}

export type ModelPrimitives = Omit<Model, 'id'>

export type ModelParams = Omit<Model, 'id'> & {
	categoryId: (typeof CategoryOptions)[keyof typeof CategoryOptions]
}

export type ModelDto = Model & {
	category: CategoryDTO
	brand: BrandDto
}
