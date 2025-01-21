import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type InputTypeId } from '../value-object/InputTypeId'
import { type InputTypeName } from '../value-object/InputTypeName'

export interface InputType {
	id: Primitives<InputTypeId>
	name: Primitives<InputTypeName>
}

export type InputTypeDto = InputType
