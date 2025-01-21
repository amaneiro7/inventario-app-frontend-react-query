import { SaveRepository } from '@/core/shared/domain/repository/SaveRepository'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type VicepresidenciaEjecutivaPrimitives } from '../dto/VicepresidenciaEjecutiva.dto'
import { type VicepresidenciaEjecutivaId } from '../value-object/VicepresidenciaEjecutivaId'

export abstract class VicepresidenciaEjecutivaSaveRepository extends SaveRepository<
	Primitives<VicepresidenciaEjecutivaId>,
	VicepresidenciaEjecutivaPrimitives
> {}
