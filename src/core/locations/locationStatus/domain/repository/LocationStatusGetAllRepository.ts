import { GetAllRepository } from '@/core/shared/domain/repository/GetAllRepository.abstract'
import { type LocationStatusDto } from '../dto/LocationStatus.dto'

export abstract class LocationStatusGetAllRepository extends GetAllRepository<LocationStatusDto> {}
