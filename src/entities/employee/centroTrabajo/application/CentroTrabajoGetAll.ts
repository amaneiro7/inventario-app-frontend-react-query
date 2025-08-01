import { GetAllBaseService } from '@/entities/shared/domain/methods/getAll.abstract'
import { type CentroTrabajoDto } from '../domain/dto/CentroTrabajo.dto'

export class CentroTrabajoGetAll extends GetAllBaseService<CentroTrabajoDto> {}
