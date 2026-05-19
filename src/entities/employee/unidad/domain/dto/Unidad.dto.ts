import type { Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import type { UnidadId } from '../value-object/UnidadId'
import type { UnidadName } from '../value-object/UnidadName'
import type { CargoId } from '@/entities/employee/cargo/domain/value-object/CargoId'
import type { Cargo } from '@/entities/employee/cargo/domain/dto/Cargo.dto'
import type { Level } from '../value-object/Level'
import type { CentroDeCosto } from '../value-object/CentroDeCosto'
import type { CodigoInterno } from '../value-object/CodigoInterno'
import type { IsUnitActive } from '../value-object/IsUnitActive'

/**
 * Represents the core properties of a Unidad entity.
 */
export interface Unidad {
	id: Primitives<UnidadId>
	name: Primitives<UnidadName>
	level: Primitives<Level>
	centroDeCosto: Primitives<CentroDeCosto>
	codigoInterno: Primitives<CodigoInterno>
	isUnitActive: Primitives<IsUnitActive>
	parentId: Primitives<UnidadId> | null
}

/**
 * Represents the primitive properties of a Unidad entity, excluding the ID but including associated cargo IDs.
 */
export type UnidadPrimitives = Omit<Unidad, 'id'> & {
	cargos: Primitives<CargoId>[]
}

/**
 * Represents the parameters used for creating or updating a Unidad entity.
 * It includes all primitive properties and an optional ID for update operations, along with associated cargo IDs.
 */
export type UnidadParams = UnidadPrimitives & {
	id?: Primitives<UnidadId>
	cargos: Primitives<CargoId>[]
}

interface FullChainResult {
	text?: string | null
	levels: string[]
}

/**
 * Represents the Data Transfer Object (DTO) for a Unidad entity, including full Cargo details and update timestamp.
 */

export type UnidadDto = Unidad & {
	full_chain: FullChainResult | null
	cargos: Cargo[]
	updatedAt: string
}
