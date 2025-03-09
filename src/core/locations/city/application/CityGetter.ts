import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type CityId } from '../domain/value-object/CityId'
import { type CityDto } from '../domain/dto/City.dto'
import { GetBaseService } from '@/core/shared/domain/methods/getter.abstract'

export class CItyGetter extends GetBaseService<Primitives<CityId>, CityDto> {}
