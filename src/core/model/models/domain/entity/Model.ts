import { ModelName } from '../value-object/ModelName'
import { CategoryId } from '@/core/category/domain/value-object/CategorydId'
import { BrandId } from '@/core/brand/domain/value-object/BrandId'
import { GenericModel } from '../value-object/GenericModel'
import { ProcessorId } from '@/core/devices/features/processor/domain/value-object/ProcessorId'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type ModelParams, type ModelPrimitives } from '../dto/Model.dto'

export class Model {
	constructor(
		private readonly name: ModelName,
		private readonly categoryId: CategoryId,
		private readonly brandId: BrandId,
		private readonly generic: GenericModel,
		private readonly processors: ProcessorId[]
	) {}

	public static create(params: ModelParams): Model {
		return new Model(
			new ModelName(params.name),
			new CategoryId(params.categoryId),
			new BrandId(params.brandId),
			new GenericModel(params.generic),
			params.processors.map(processorId => new ProcessorId(processorId))
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

	get processorsValue(): Primitives<ProcessorId>[] {
		return this.processors.map(p => p.value)
	}

	toPrimitives(): ModelPrimitives {
		return {
			name: this.nameValue,
			categoryId: this.categoryValue,
			brandId: this.brandValue,
			generic: this.genericValue,
			processors: this.processorsValue
		}
	}
}
