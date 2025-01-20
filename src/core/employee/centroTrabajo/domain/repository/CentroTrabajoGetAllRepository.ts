import { GetAllRepository } from '@/core/shared/domain/repository/GetAllRepository.abstract'
import { type CentroTrabajoDto } from '../dto/CentroTrabajo.dto'

export abstract class CentroTrabajoGetAllRepository extends GetAllRepository<CentroTrabajoDto> {}
