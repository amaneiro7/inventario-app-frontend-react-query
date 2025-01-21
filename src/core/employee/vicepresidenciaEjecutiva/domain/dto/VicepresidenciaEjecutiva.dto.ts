import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type VicepresidenciaEjecutivaId } from '../value-object/VicepresidenciaEjecutivaId'
import { type VicepresidenciaEjecutivaName } from '../value-object/VicepresidenciaEjecutivaName'
import { type DirectivaId } from '@/core/employee/directiva/domain/value-object/DirectivaId'
import { type DirectivaDto } from '@/core/employee/directiva/domain/dto/Directiva.dto'

export interface VicepresidenciaEjecutiva {
	id: Primitives<VicepresidenciaEjecutivaId>
	name: Primitives<VicepresidenciaEjecutivaName>
	directivaId: Primitives<DirectivaId>
}

export type VicepresidenciaEjecutivaPrimitives = Omit<
	VicepresidenciaEjecutiva,
	'id'
>

export type VicepresidenciaEjecutivaDto = VicepresidenciaEjecutiva & {
	directiva: DirectivaDto
}
