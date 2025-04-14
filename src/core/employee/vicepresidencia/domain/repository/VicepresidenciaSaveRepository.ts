import { SaveRepository } from '@/core/shared/domain/repository/SaveRepository'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type VicepresidenciaPrimitives } from '../dto/Vicepresidencia.dto'
import { type VicepresidenciaId } from '../value-object/VicepresidenciaId'

export abstract class VicepresidenciaSaveRepository extends SaveRepository<
	Primitives<VicepresidenciaId>,
	VicepresidenciaPrimitives
> {}
