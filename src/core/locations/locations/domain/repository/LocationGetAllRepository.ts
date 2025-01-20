import { type LocationDto } from '../dto/Location.dto'
import { GetAllRepository } from '@/core/shared/domain/repository/GetAllRepository.abstract'

export abstract class LocationGetAllRepository extends GetAllRepository<LocationDto> {}
