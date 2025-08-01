import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type ModelParams, type ModelPrimitives } from './Model.dto'
import { type CategoryOptions } from '@/entities/category/domain/entity/CategoryOptions'
import { type InputTypeId } from '@/entities/model/inputType/domain/value-object/InputTypeId'
import { type HasFingerPrintReader } from '../value-object/HasFingerPrintReader'
import { type InputTypeDto } from '@/entities/model/inputType/domain/dto/InputType.dto'
import { type MainCategoryOptions } from '@/entities/mainCategory/domain/entity/MainCategoryOptions'

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
