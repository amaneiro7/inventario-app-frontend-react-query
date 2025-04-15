import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type VicepresidenciaId } from '../value-object/VicepresidenciaId'
import { type VicepresidenciaName } from '../value-object/VicepresidenciaName'
import { type VicepresidenciaEjecutivaId } from '@/core/employee/vicepresidenciaEjecutiva/domain/value-object/VicepresidenciaEjecutivaId'
import { type VicepresidenciaEjecutivaDto } from '@/core/employee/vicepresidenciaEjecutiva/domain/dto/VicepresidenciaEjecutiva.dto'
import { type Cargo } from '@/core/employee/cargo/domain/dto/Cargo.dto'
import { type CargoId } from '@/core/employee/cargo/domain/value-object/CargoId'

export interface Vicepresidencia {
	id: Primitives<VicepresidenciaId>
	name: Primitives<VicepresidenciaName>
	vicepresidenciaEjecutivaId: Primitives<VicepresidenciaEjecutivaId>
}

export type VicepresidenciaParams = VicepresidenciaPrimitives & {
	id?: Primitives<VicepresidenciaId> | undefined
	cargos: Primitives<CargoId>[]
}

export type VicepresidenciaPrimitives = Omit<Vicepresidencia, 'id'> & {
	cargos: Primitives<CargoId>[]
}

export type VicepresidenciaDto = Vicepresidencia & {
	vicepresidenciaEjecutiva: VicepresidenciaEjecutivaDto
	cargos: Cargo[]
	updatedAt: string
}
