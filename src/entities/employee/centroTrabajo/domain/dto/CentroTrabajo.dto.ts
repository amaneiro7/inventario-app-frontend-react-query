import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type CentroTrabajoId } from '../value-object/CentroTrabajoId'
import { type CentroTrabajoName } from '../value-object/CentroTrabajoName'
import { type CentroCostoId } from '@/entities/employee/centroCosto/domain/value-object/CentroCostoId'
import { type CentroCostoDto } from '@/entities/employee/centroCosto/domain/dto/CentroCosto.dto'

export interface CentroTrabajo {
	id: Primitives<CentroTrabajoId>
	name: Primitives<CentroTrabajoName>
	centroCostoId: Primitives<CentroCostoId>
}

export type CentroTrabajoPrimitives = CentroTrabajo
export type CentroTrabajoParams = CentroTrabajoPrimitives

export type CentroTrabajoDto = CentroTrabajo & {
	centroCosto: CentroCostoDto
	updatedAt: string
}
