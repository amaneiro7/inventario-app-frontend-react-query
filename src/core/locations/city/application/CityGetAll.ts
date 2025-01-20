import { GetAllBaseService } from '@/core/shared/domain/methods/getAll.abstract'
import { CityDto } from '../domain/dto/City.dto'

export class CityGetAll extends GetAllBaseService<CityDto> {}
