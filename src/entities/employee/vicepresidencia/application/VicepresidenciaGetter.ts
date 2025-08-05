import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type VicepresidenciaDto } from '../domain/dto/Vicepresidencia.dto'
import { type VicepresidenciaId } from '../domain/value-object/VicepresidenciaId'
import { GetBaseService } from '@/entities/shared/domain/methods/getter.abstract'

/**
 * Service class for retrieving a single Vicepresidencia entity by its ID.
 * It extends GetBaseService, providing generic functionality for fetching a single record
 * of type VicepresidenciaDto using a VicepresidenciaId primitive as the identifier.
 */
export class VicepresidenciaGetter extends GetBaseService<
	Primitives<VicepresidenciaId>,
	VicepresidenciaDto
> {}