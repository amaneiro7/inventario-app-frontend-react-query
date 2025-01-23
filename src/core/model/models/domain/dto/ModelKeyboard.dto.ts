import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type ModelParams, type ModelPrimitives } from './Model.dto'
import { type CategoryOptions } from '@/core/category/domain/entity/CategoryOptions'
import { type InputTypeId } from '@/core/model/inputType/domain/value-object/InputTypeId'
import { type HasFingerPrintReader } from '../value-object/HasFingerPrintReader'
import { type InputTypeDto } from '@/core/model/inputType/domain/dto/InputType.dto'
import { type MainCategoryOptions } from '@/core/mainCategory/domain/entity/MainCategoryOptions'

export type ModelKeyboardPrimitives = ModelPrimitives & {
	inputTypeId: Primitives<InputTypeId>
	hasFingerPrintReader: Primitives<HasFingerPrintReader>
}

export type ModelKeyboardParams = ModelParams & {
	mainCategoryId: MainCategoryOptions.PARTS
	categoryId: CategoryOptions.KEYBOARD
	inputTypeId: Primitives<InputTypeId>
	hasFingerPrintReader: Primitives<HasFingerPrintReader>
}

export interface ModelKeyboardDto {
	inputTypeId: Primitives<InputTypeId>
	hasFingerPrintReader: Primitives<HasFingerPrintReader>
	inputType: InputTypeDto
}
