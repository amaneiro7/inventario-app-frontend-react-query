import { GetRepository } from '@/entities/shared/domain/repository/GetterRepository.abstract'
import { type VicepresidenciaDto } from '../dto/Vicepresidencia.dto'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type VicepresidenciaId } from '../value-object/VicepresidenciaId'

/**
 * Abstract class for a repository that provides methods for retrieving a single Vicepresidencia entity.
 * It extends the generic `GetRepository` with `Primitives<VicepresidenciaId>` as the ID type and `VicepresidenciaDto` as the entity type.
 */
export abstract class VicepresidenciaGetRepository extends GetRepository<
	Primitives<VicepresidenciaId>,
	VicepresidenciaDto
> {}