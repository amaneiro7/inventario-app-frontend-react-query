import { SaveRepository } from '@/core/shared/domain/repository/SaveRepository'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type CentroTrabajoPrimitives } from '../dto/CentroTrabajo.dto'
import { type CentroTrabajoId } from '../value-object/CentroTrabajoId'

export abstract class CentroTrabajoSaveRepository extends SaveRepository<
	Primitives<CentroTrabajoId>,
	CentroTrabajoPrimitives
> {}
