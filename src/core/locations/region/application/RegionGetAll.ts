import { GetAllBaseService } from '@/core/shared/domain/methods/getAll.abstract'
import { type RegionDTO } from '../domain/dto/region.dto'

export class RegionGetAll extends GetAllBaseService<RegionDTO[]> {}
