import { GetRepository } from '@/entities/shared/domain/repository/GetterRepository.abstract'
import { type CityDto } from '@/entities/locations/city/domain/dto/City.dto'
import { type CityId } from '@/entities/locations/city/domain/value-object/CityId'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'

export abstract class CityGetRepository extends GetRepository<Primitives<CityId>, CityDto> {}
