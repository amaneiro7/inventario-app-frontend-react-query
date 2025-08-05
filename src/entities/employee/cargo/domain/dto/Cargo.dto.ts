import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type CargoId } from '../value-object/CargoId'
import { type CargoName } from '../value-object/CargoName'
import { type DepartamentoId } from '@/entities/employee/departamento/domain/value-object/DepartamentoId'
import { type Departamento } from '@/entities/employee/departamento/domain/dto/Departamento.dto'

/**
 * Represents the core properties of a Cargo entity.
 */
export interface Cargo {
	id: Primitives<CargoId>
	name: Primitives<CargoName>
}

/**
 * Represents the primitive properties of a Cargo entity, excluding the ID but including associated department IDs.
 */
export type CargoPrimitives = Omit<Cargo, 'id'> & {
	departamentos: Primitives<DepartamentoId>[]
}

/**
 * Represents the parameters used for creating or updating a Cargo entity.
 * It includes all primitive properties and an optional ID for update operations.
 */
export type CargoParams = CargoPrimitives & {
	id?: Primitives<CargoId>
	departamentos: Primitives<DepartamentoId>[]
}

/**
 * Represents the Data Transfer Object (DTO) for a Cargo entity, including full Department details and update timestamp.
 */
export type CargoDto = Cargo & {
	departamentos: Departamento[]
	updatedAt: string
}