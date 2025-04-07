import { GetRepository } from '@/core/shared/domain/repository/GetterRepository.abstract'
import { type RegionDto } from '@/core/locations/region/domain/dto/region.dto'
import { type RegionId } from '@/core/locations/region/domain/value-object/RegionId'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'

export abstract class RegionGetRepository extends GetRepository<Primitives<RegionId>, RegionDto> {}
