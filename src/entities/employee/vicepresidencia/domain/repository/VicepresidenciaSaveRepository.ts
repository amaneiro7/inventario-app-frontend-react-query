import { SaveRepository } from '@/entities/shared/domain/repository/SaveRepository'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type VicepresidenciaPrimitives } from '../dto/Vicepresidencia.dto'
import { type VicepresidenciaId } from '../value-object/VicepresidenciaId'

export abstract class VicepresidenciaSaveRepository extends SaveRepository<
	Primitives<VicepresidenciaId>,
	VicepresidenciaPrimitives
> {}
