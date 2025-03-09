import { GetRepository } from '@/core/shared/domain/repository/GetterRepository.abstract'
import { type CityDto } from '@/core/locations/city/domain/dto/City.dto'
import { type CityId } from '@/core/locations/city/domain/value-object/CityId'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'

export abstract class CityGetRepository extends GetRepository<Primitives<CityId>, CityDto> {}
