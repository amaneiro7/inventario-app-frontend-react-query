import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type CargoId } from '../value-object/CargoId'
import { type CargoName } from '../value-object/CargoName'
import type { UnidadId } from '@/entities/employee/unidad/domain/value-object/UnidadId'
import type { UnidadDto } from '@/entities/employee/unidad/domain/dto/Unidad.dto'

/**
 * Represents the core properties of a Cargo entity.
 */
export interface Cargo {
	id: Primitives<CargoId>
	name: Primitives<CargoName>
}

/**
 * Represents the primitive properties of a Cargo entity, excluding the ID but including associated unit IDs.
 */
export type CargoPrimitives = Omit<Cargo, 'id'> & {
	unidades: Primitives<UnidadId>[]
}

/**
 * Represents the parameters used for creating or updating a Cargo entity.
 * It includes all primitive properties and an optional ID for update operations.
 */
export type CargoParams = CargoPrimitives & {
	id?: Primitives<CargoId>
	unidades: Primitives<UnidadId>[]
}

/**
 * Represents the Data Transfer Object (DTO) for a Cargo entity, including full Unit details and update timestamp.
 */
export type CargoDto = Cargo & {
	unidades: UnidadDto[]
	updatedAt: string
}
