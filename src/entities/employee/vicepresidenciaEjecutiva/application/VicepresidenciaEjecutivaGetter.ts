import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type VicepresidenciaEjecutivaDto } from '../domain/dto/VicepresidenciaEjecutiva.dto'
import { type VicepresidenciaEjecutivaId } from '../domain/value-object/VicepresidenciaEjecutivaId'
import { GetBaseService } from '@/entities/shared/domain/methods/getter.abstract'

/**
 * Service class for retrieving a single VicepresidenciaEjecutiva entity by its ID.
 * It extends GetBaseService, providing generic functionality for fetching a single record
 * of type VicepresidenciaEjecutivaDto using a VicepresidenciaEjecutivaId primitive as the identifier.
 */
export class VicepresidenciaEjecutivaGetter extends GetBaseService<
	Primitives<VicepresidenciaEjecutivaId>,
	VicepresidenciaEjecutivaDto
> {}