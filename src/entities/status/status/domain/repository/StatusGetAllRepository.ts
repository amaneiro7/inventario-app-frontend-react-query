import { GetAllRepository } from '@/entities/shared/domain/repository/GetAllRepository.abstract'
import { type StatusDto } from '../dto/Status.dto'

export abstract class StatusGetAllRepository extends GetAllRepository<StatusDto> {}
