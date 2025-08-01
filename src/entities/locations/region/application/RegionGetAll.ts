import { GetAllBaseService } from '@/entities/shared/domain/methods/getAll.abstract'
import { type RegionDto } from '../domain/dto/region.dto'

export class RegionGetAll extends GetAllBaseService<RegionDto> {}
