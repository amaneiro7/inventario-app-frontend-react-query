import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type VicepresidenciaId } from '../value-object/VicepresidenciaId'
import { type VicepresidenciaName } from '../value-object/VicepresidenciaName'
import { type VicepresidenciaEjecutivaId } from '@/entities/employee/vicepresidenciaEjecutiva/domain/value-object/VicepresidenciaEjecutivaId'
import { type VicepresidenciaEjecutivaDto } from '@/entities/employee/vicepresidenciaEjecutiva/domain/dto/VicepresidenciaEjecutiva.dto'
import { type Cargo } from '@/entities/employee/cargo/domain/dto/Cargo.dto'
import { type CargoId } from '@/entities/employee/cargo/domain/value-object/CargoId'

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
