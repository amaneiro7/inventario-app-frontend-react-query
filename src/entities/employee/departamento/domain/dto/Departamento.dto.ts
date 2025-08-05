import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type DepartamentoId } from '../value-object/DepartamentoId'
import { type DepartamentoName } from '../value-object/DepartamentoName'
import { type VicepresidenciaId } from '@/entities/employee/vicepresidencia/domain/value-object/VicepresidenciaId'
import { type VicepresidenciaDto } from '@/entities/employee/vicepresidencia/domain/dto/Vicepresidencia.dto'
import { type CargoId } from '@/entities/employee/cargo/domain/value-object/CargoId'
import { type Cargo } from '@/entities/employee/cargo/domain/dto/Cargo.dto'

/**
 * Represents the core properties of a Departamento entity.
 */
export interface Departamento {
	id: Primitives<DepartamentoId>
	name: Primitives<DepartamentoName>
	vicepresidenciaId: Primitives<VicepresidenciaId>
}

/**
 * Represents the parameters used for creating or updating a Departamento entity.
 * It includes all primitive properties and an optional ID for update operations, along with associated cargo IDs.
 */
export type DepartamentoParams = DepartamentoPrimitives & {
	id?: Primitives<DepartamentoId>
	cargos: Primitives<CargoId>[]
}

/**
 * Represents the primitive properties of a Departamento entity, excluding the ID but including associated cargo IDs.
 */
export type DepartamentoPrimitives = Omit<Departamento, 'id'> & {
	cargos: Primitives<CargoId>[]
}

/**
 * Represents the Data Transfer Object (DTO) for a Departamento entity, including full Vicepresidencia and Cargo details, and update timestamp.
 */
export type DepartamentoDto = Departamento & {
	vicepresidencia: VicepresidenciaDto
	cargos: Cargo[]
	updatedAt: string
}