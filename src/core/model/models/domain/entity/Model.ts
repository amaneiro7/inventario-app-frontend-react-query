import { ModelName } from '../value-object/ModelName'
import { CategoryId } from '@/core/category/domain/value-object/CategorydId'
import { BrandId } from '@/core/brand/domain/value-object/BrandId'
import { GenericModel } from '../value-object/GenericModel'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type ModelParams, type ModelPrimitives } from '../dto/Model.dto'

export class Model {
	constructor(
		private readonly name: ModelName,
		private readonly categoryId: CategoryId,
		private readonly brandId: BrandId,
		private readonly generic: GenericModel
	) {}

	public static create(params: ModelParams): Model {
		return new Model(
			new ModelName(params.name),
			new CategoryId(params.categoryId),
			new BrandId(params.brandId),
			new GenericModel(params.generic)
		)
	}

	get nameValue(): Primitives<ModelName> {
		return this.name.value
	}

	get categoryValue(): Primitives<CategoryId> {
		return this.categoryId.value
	}

	get brandValue(): Primitives<BrandId> {
		return this.brandId.value
	}

	get genericValue(): Primitives<GenericModel> {
		return this.generic.value
	}

	toPrimitives(): ModelPrimitives {
		return {
			name: this.nameValue,
			categoryId: this.categoryValue,
			brandId: this.brandValue,
			generic: this.genericValue
		}
	}
}
