import { GetAllRepository } from '@/core/shared/domain/repository/GetAllRepository.abstract'
import { type RegionDto } from '../dto/region.dto'

export abstract class RegionGetAllRepository extends GetAllRepository<RegionDto> {}
