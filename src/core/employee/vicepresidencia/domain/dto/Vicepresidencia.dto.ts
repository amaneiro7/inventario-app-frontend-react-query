import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type VicepresidenciaId } from '../value-object/VicepresidenciaId'
import { type VicepresidenciaName } from '../value-object/VicepresidenciaName'
import { type VicepresidenciaEjecutivaId } from '@/core/employee/vicepresidenciaEjecutiva/domain/value-object/VicepresidenciaEjecutivaId'
import { type VicepresidenciaEjecutivaDto } from '@/core/employee/vicepresidenciaEjecutiva/domain/dto/VicepresidenciaEjecutiva.dto'

export interface Vicepresidencia {
	id: Primitives<VicepresidenciaId>
	name: Primitives<VicepresidenciaName>
	vicepresidenciaEjecutivaId: Primitives<VicepresidenciaEjecutivaId>
}

export type VicepresidenciaPrimitives = Omit<Vicepresidencia, 'id'>

export type VicepresidenciaParams = VicepresidenciaPrimitives & {
	id?: Primitives<VicepresidenciaId> | undefined
}

export type VicepresidenciaDto = Vicepresidencia & {
	vicepresidenciaEjecutiva: VicepresidenciaEjecutivaDto
}
