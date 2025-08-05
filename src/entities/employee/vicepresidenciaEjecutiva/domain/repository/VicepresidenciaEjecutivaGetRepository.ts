import { GetRepository } from '@/entities/shared/domain/repository/GetterRepository.abstract'
import { type VicepresidenciaEjecutivaDto } from '../dto/VicepresidenciaEjecutiva.dto'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type VicepresidenciaEjecutivaId } from '../value-object/VicepresidenciaEjecutivaId'

/**
 * Abstract class for a repository that provides methods for retrieving a single VicepresidenciaEjecutiva entity.
 * It extends the generic `GetRepository` with `Primitives<VicepresidenciaEjecutivaId>` as the ID type and `VicepresidenciaEjecutivaDto` as the entity type.
 */
export abstract class VicepresidenciaEjecutivaGetRepository extends GetRepository<
	Primitives<VicepresidenciaEjecutivaId>,
	VicepresidenciaEjecutivaDto
> {}