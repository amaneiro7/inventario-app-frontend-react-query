import { type VicepresidenciaEjecutivaDto } from '../domain/dto/VicepresidenciaEjecutiva.dto'
import { type VicepresidenciaEjecutivaId } from '../domain/value-object/VicepresidenciaEjecutivaId'
import { GetBaseService } from '@/core/shared/domain/methods/getter.abstract'

export class VicepresidenciaEjecutivaGetter extends GetBaseService<
	VicepresidenciaEjecutivaId,
	VicepresidenciaEjecutivaDto
> {}
