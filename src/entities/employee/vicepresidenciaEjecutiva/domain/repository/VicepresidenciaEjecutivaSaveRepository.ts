import { SaveRepository } from '@/entities/shared/domain/repository/SaveRepository'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type VicepresidenciaEjecutivaPrimitives } from '../dto/VicepresidenciaEjecutiva.dto'
import { type VicepresidenciaEjecutivaId } from '../value-object/VicepresidenciaEjecutivaId'

/**
 * Abstract class for a repository that provides methods for saving (creating and updating) VicepresidenciaEjecutiva entities.
 * It extends the generic `SaveRepository` with `Primitives<VicepresidenciaEjecutivaId>` as the ID type and `VicepresidenciaEjecutivaPrimitives` as the entity type.
 */
export abstract class VicepresidenciaEjecutivaSaveRepository extends SaveRepository<
	Primitives<VicepresidenciaEjecutivaId>,
	VicepresidenciaEjecutivaPrimitives
> {}