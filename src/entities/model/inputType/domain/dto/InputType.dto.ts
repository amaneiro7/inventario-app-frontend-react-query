import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type InputTypeId } from '../value-object/InputTypeId'
import { type InputTypeName } from '../value-object/InputTypeName'

/**
 * Represents the core properties of an InputType entity.
 */
export interface InputType {
	id: Primitives<InputTypeId>
	name: Primitives<InputTypeName>
}

/**
 * Represents the Data Transfer Object (DTO) for an InputType entity.
 * In this case, it's identical to the base `InputType` interface.
 */
export type InputTypeDto = InputType