import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type VicepresidenciaId } from '../value-object/VicepresidenciaId'
import { type VicepresidenciaName } from '../value-object/VicepresidenciaName'
import { type VicepresidenciaEjecutivaId } from '@/entities/employee/vicepresidenciaEjecutiva/domain/value-object/VicepresidenciaEjecutivaId'
import { type VicepresidenciaEjecutivaDto } from '@/entities/employee/vicepresidenciaEjecutiva/domain/dto/VicepresidenciaEjecutiva.dto'
import { type Cargo } from '@/entities/employee/cargo/domain/dto/Cargo.dto'
import { type CargoId } from '@/entities/employee/cargo/domain/value-object/CargoId'

/**
 * Represents the core properties of a Vicepresidencia entity.
 */
export interface Vicepresidencia {
	id: Primitives<VicepresidenciaId>
	name: Primitives<VicepresidenciaName>
	vicepresidenciaEjecutivaId: Primitives<VicepresidenciaEjecutivaId>
}

/**
 * Represents the parameters used for creating or updating a Vicepresidencia entity.
 * It includes all primitive properties and an optional ID for update operations, along with associated cargo IDs.
 */
export type VicepresidenciaParams = VicepresidenciaPrimitives & {
	id?: Primitives<VicepresidenciaId> | undefined
	cargos: Primitives<CargoId>[]
}

/**
 * Represents the primitive properties of a Vicepresidencia entity, excluding the ID but including associated cargo IDs.
 */
export type VicepresidenciaPrimitives = Omit<Vicepresidencia, 'id'> & {
	cargos: Primitives<CargoId>[]
}

/**
 * Represents the Data Transfer Object (DTO) for a Vicepresidencia entity, including full VicepresidenciaEjecutiva and Cargo details, and update timestamp.
 */
export type VicepresidenciaDto = Vicepresidencia & {
	vicepresidenciaEjecutiva: VicepresidenciaEjecutivaDto
	cargos: Cargo[]
	updatedAt: string
}