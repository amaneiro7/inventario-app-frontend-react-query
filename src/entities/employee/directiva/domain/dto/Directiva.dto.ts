import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type DirectivaId } from '../value-object/DirectivaId'
import { type DirectivaName } from '../value-object/DirectivaName'
import { type CargoId } from '@/entities/employee/cargo/domain/value-object/CargoId'
import { type Cargo } from '@/entities/employee/cargo/domain/dto/Cargo.dto'

/**
 * Represents the core properties of a Directiva entity.
 */
export interface Directiva {
	id: Primitives<DirectivaId>
	name: Primitives<DirectivaName>
}

/**
 * Represents the primitive properties of a Directiva entity, excluding the ID but including associated cargo IDs.
 */
export type DirectivaPrimitives = Omit<Directiva, 'id'> & {
	cargos: Primitives<CargoId>[]
}

/**
 * Represents the parameters used for creating or updating a Directiva entity.
 * It includes all primitive properties and an optional ID for update operations, along with associated cargo IDs.
 */
export type DirectivaParams = DirectivaPrimitives & {
	id?: Primitives<DirectivaId>
	cargos: Primitives<CargoId>[]
}

/**
 * Represents the Data Transfer Object (DTO) for a Directiva entity, including full Cargo details and update timestamp.
 */
export type DirectivaDto = Directiva & {
	cargos: Cargo[]
	updatedAt: string
}