import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import {
	type ModelDto,
	type ModelParams,
	type ModelPrimitives,
	type Model
} from './Model.dto'
import { type CategoryOptions } from '@/core/category/domain/entity/CategoryOptions'
import { type InputTypeId } from '@/core/model/inputType/domain/value-object/InputTypeId'
import { type HasFingerPrintReader } from '../value-object/HasFingerPrintReader'
import { type InputTypeDto } from '@/core/model/inputType/domain/dto/InputType.dto'
import { MainCategoryOptions } from '@/core/mainCategory/domain/entity/MainCategoryOptions'

export interface ModelKeyboard extends Model {
	inputTypeId: Primitives<InputTypeId>
	hasFingerPrintReader: Primitives<HasFingerPrintReader>
}

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

export type ModelKeyboardDto = ModelDto & {
	categoryId: CategoryOptions.KEYBOARD
	inputTypeId: Primitives<InputTypeId>
	hasFingerPrintReader: Primitives<HasFingerPrintReader>
	inputType: InputTypeDto
}
