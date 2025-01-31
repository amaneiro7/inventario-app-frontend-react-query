import { BrandId } from '@/core/brand/domain/value-object/BrandId'
import { GenericModel } from '../value-object/GenericModel'
import { Model } from './Model'
import { CategoryId } from '@/core/category/domain/value-object/CategorydId'
import { ModelName } from '../value-object/ModelName'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type ModelKeyboardParams, type ModelKeyboardPrimitives } from '../dto/ModelKeyboard.dto'
import { InvalidArgumentError } from '@/core/shared/domain/value-objects/InvalidArgumentError'
import { CategoryOptions } from '@/core/category/domain/entity/CategoryOptions'
import { isPartsCategory } from '../../../../mainCategory/domain/use-case/IsPartsCategory'
import { HasFingerPrintReader } from '../value-object/HasFingerPrintReader'
import { InputTypeId } from '@/core/model/inputType/domain/value-object/InputTypeId'

export class ModelKeyboard extends Model {
	constructor(
		name: ModelName,
		categoryId: CategoryId,
		brandId: BrandId,
		generic: GenericModel,
		private readonly inputTypeId: InputTypeId,
		private readonly hasFingerPrintReader: HasFingerPrintReader
	) {
		super(name, categoryId, brandId, generic)
	}

	public static create(params: ModelKeyboardParams): ModelKeyboard {
		if (!isPartsCategory(params.mainCategoryId)) {
			throw new InvalidArgumentError(
				'No pertenece a esta categoria, solo se permiten partes y piezas.'
			)
		}
		const allowedCategoryOptions = [CategoryOptions.KEYBOARD]
		if (!allowedCategoryOptions.includes(params.categoryId)) {
			throw new InvalidArgumentError(
				'No Pertenece a esta categoria, solo se permite teclados.'
			)
		}
		return new ModelKeyboard(
			new ModelName(params.name),
			new CategoryId(params.categoryId),
			new BrandId(params.brandId),
			new GenericModel(params.generic),
			new InputTypeId(params.inputTypeId),
			new HasFingerPrintReader(params.hasFingerPrintReader)
		)
	}

	get inputTypeValue(): Primitives<InputTypeId> {
		return this.inputTypeId.value
	}
	get hasFingerPrintReaderValue(): Primitives<HasFingerPrintReader> {
		return this.hasFingerPrintReader.value
	}

	toPrimitives(): ModelKeyboardPrimitives {
		return {
			name: this.nameValue,
			categoryId: this.categoryValue,
			brandId: this.brandValue,
			generic: this.genericValue,
			inputTypeId: this.inputTypeValue,
			hasFingerPrintReader: this.hasFingerPrintReaderValue
		}
	}
}
