import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type VicepresidenciaEjecutivaDto } from '../domain/dto/VicepresidenciaEjecutiva.dto'
import { type VicepresidenciaEjecutivaId } from '../domain/value-object/VicepresidenciaEjecutivaId'
import { GetBaseService } from '@/entities/shared/domain/methods/getter.abstract'

export class VicepresidenciaEjecutivaGetter extends GetBaseService<
	Primitives<VicepresidenciaEjecutivaId>,
	VicepresidenciaEjecutivaDto
> {}
