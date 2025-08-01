import { type LocationDto } from '../dto/Location.dto'
import { GetAllRepository } from '@/entities/shared/domain/repository/GetAllRepository.abstract'

export abstract class LocationGetAllRepository extends GetAllRepository<LocationDto> {}
