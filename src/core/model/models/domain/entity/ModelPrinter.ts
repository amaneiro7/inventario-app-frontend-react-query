import { BrandId } from '@/core/brand/domain/value-object/BrandId'
import { GenericModel } from '../value-object/GenericModel'
import { Model } from './Model'
import { CategoryId } from '@/core/category/domain/value-object/CategorydId'
import { ModelName } from '../value-object/ModelName'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type ModelPrinterParams, type ModelPrinterPrimitives } from '../dto/ModelPrinter.dto'
import { InvalidArgumentError } from '@/core/shared/domain/value-objects/InvalidArgumentError'
import { CategoryOptions } from '@/core/category/domain/entity/CategoryOptions'
import { CartridgeModel } from '../value-object/CartridgeModel'
import { isPrinterCategory } from '../../../../mainCategory/domain/use-case/isPrinterCategory'
import { ProcessorId } from '@/core/devices/features/processor/domain/value-object/ProcessorId'

export class ModelPrinter extends Model {
	constructor(
		name: ModelName,
		categoryId: CategoryId,
		brandId: BrandId,
		generic: GenericModel,
		processors: ProcessorId[],
		private readonly cartridgeModel: CartridgeModel
	) {
		super(name, categoryId, brandId, generic, processors)
	}

	public static create(params: ModelPrinterParams): ModelPrinter {
		if (!isPrinterCategory(params.mainCategoryId)) {
			throw new InvalidArgumentError(
				'No pertenece a esta categoria, solo se permiten impresoras'
			)
		}
		const allowedCategoryOptions = [CategoryOptions.INKPRINTER, CategoryOptions.LASERPRINTER]
		if (!allowedCategoryOptions.includes(params.categoryId)) {
			throw new InvalidArgumentError(
				'No Pertenece a esta categoria, solo se permite impresoras laser e impresoras de tinta'
			)
		}
		return new ModelPrinter(
			new ModelName(params.name),
			new CategoryId(params.categoryId),
			new BrandId(params.brandId),
			new GenericModel(params.generic),
			params.processors.map(processorId => new ProcessorId(processorId)),
			new CartridgeModel(params.cartridgeModel)
		)
	}

	get cartridgeModelValue(): Primitives<CartridgeModel> {
		return this.cartridgeModel.value
	}

	toPrimitives(): ModelPrinterPrimitives {
		return {
			name: this.nameValue,
			categoryId: this.categoryValue,
			brandId: this.brandValue,
			generic: this.genericValue,
			processors: this.processorsValue,
			cartridgeModel: this.cartridgeModelValue
		}
	}
}
