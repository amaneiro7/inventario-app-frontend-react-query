import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type VicepresidenciaEjecutivaId } from '../value-object/VicepresidenciaEjecutivaId'
import { type VicepresidenciaEjecutivaName } from '../value-object/VicepresidenciaEjecutivaName'
import { type DirectivaId } from '@/entities/employee/directiva/domain/value-object/DirectivaId'
import { type DirectivaDto } from '@/entities/employee/directiva/domain/dto/Directiva.dto'
import { type CargoId } from '@/entities/employee/cargo/domain/value-object/CargoId'
import { type Cargo } from '@/entities/employee/cargo/domain/dto/Cargo.dto'

/**
 * Represents the core properties of a VicepresidenciaEjecutiva entity.
 */
export interface VicepresidenciaEjecutiva {
	id: Primitives<VicepresidenciaEjecutivaId>
	name: Primitives<VicepresidenciaEjecutivaName>
	directivaId: Primitives<DirectivaId>
}

/**
 * Represents the primitive properties of a VicepresidenciaEjecutiva entity, excluding the ID but including associated cargo IDs.
 */
export type VicepresidenciaEjecutivaPrimitives = Omit<VicepresidenciaEjecutiva, 'id'> & {
	cargos: Primitives<CargoId>[]
}

/**
 * Represents the parameters used for creating or updating a VicepresidenciaEjecutiva entity.
 * It includes all primitive properties and an optional ID for update operations, along with associated cargo IDs.
 */
export type VicepresidenciaEjecutivaParams = VicepresidenciaEjecutivaPrimitives & {
	id?: Primitives<VicepresidenciaEjecutivaId>
	cargos: Primitives<CargoId>[]
}

/**
 * Represents the Data Transfer Object (DTO) for a VicepresidenciaEjecutiva entity, including full Directiva and Cargo details, and update timestamp.
 */
export type VicepresidenciaEjecutivaDto = VicepresidenciaEjecutiva & {
	directiva: DirectivaDto
	cargos: Cargo[]
	updatedAt: string
}