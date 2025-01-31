import { type CentroTrabajoDto } from '../domain/dto/CentroTrabajo.dto'
import { type CentroTrabajoId } from '../domain/value-object/CentroTrabajoId'
import { GetBaseService } from '@/core/shared/domain/methods/getter.abstract'

export class CentroTrabajoGetter extends GetBaseService<CentroTrabajoId, CentroTrabajoDto> {}
