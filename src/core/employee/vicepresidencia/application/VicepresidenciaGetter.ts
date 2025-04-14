import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type VicepresidenciaDto } from '../domain/dto/Vicepresidencia.dto'
import { type VicepresidenciaId } from '../domain/value-object/VicepresidenciaId'
import { GetBaseService } from '@/core/shared/domain/methods/getter.abstract'

export class VicepresidenciaGetter extends GetBaseService<
	Primitives<VicepresidenciaId>,
	VicepresidenciaDto
> {}
