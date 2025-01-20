import { GetAllRepository } from '@/core/shared/domain/repository/GetAllRepository.abstract'
import { CityDto } from '../dto/City.dto'

export abstract class CityGetAllRepository extends GetAllRepository<CityDto> {}
