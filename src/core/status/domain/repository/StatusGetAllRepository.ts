import { GetAllRepository } from '@/core/shared/domain/repository/GetAllRepository.abstract'
import { StatusDto } from '../dto/Status.dto'

export abstract class StatusGetAllRepository extends GetAllRepository<StatusDto> {}
