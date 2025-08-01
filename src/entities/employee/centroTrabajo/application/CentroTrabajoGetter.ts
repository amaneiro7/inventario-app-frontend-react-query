import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type CentroTrabajoDto } from '../domain/dto/CentroTrabajo.dto'
import { type CentroTrabajoId } from '../domain/value-object/CentroTrabajoId'
import { GetBaseService } from '@/entities/shared/domain/methods/getter.abstract'

export class CentroTrabajoGetter extends GetBaseService<
	Primitives<CentroTrabajoId>,
	CentroTrabajoDto
> {}
