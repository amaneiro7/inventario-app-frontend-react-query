import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type MainCategoryId } from '../value-object/MainCategoryId'
import { MainCategoryName } from '../value-object/MainCategoryName'

/**
 * Represents the core properties of a MainCategory entity.
 */
export interface MainCategory {
	id: Primitives<MainCategoryId>
	name: Primitives<MainCategoryName>
}

/**
 * Represents the primitive properties of a MainCategory entity, excluding the ID.
 */
export type MainCategoryPrimitives = Omit<MainCategory, 'id'>

/**
 * Represents the Data Transfer Object (DTO) for a MainCategory entity.
 * In this case, it's identical to the base `MainCategory` interface.
 */
export type MainCategoryDto = MainCategory