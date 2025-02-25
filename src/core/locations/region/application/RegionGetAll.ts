import { GetAllBaseService } from '@/core/shared/domain/methods/getAll.abstract'
import { type RegionDto } from '../domain/dto/region.dto'

export class RegionGetAll extends GetAllBaseService<RegionDto> {}
