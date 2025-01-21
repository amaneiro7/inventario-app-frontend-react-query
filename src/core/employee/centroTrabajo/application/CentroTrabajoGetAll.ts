import { GetAllBaseService } from '@/core/shared/domain/methods/getAll.abstract'
import { type CentroTrabajoDto } from '../domain/dto/CentroTrabajo.dto'

export class CentroTrabajoGetAll extends GetAllBaseService<CentroTrabajoDto> {}
