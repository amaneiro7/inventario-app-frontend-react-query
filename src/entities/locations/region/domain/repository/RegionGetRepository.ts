import { GetRepository } from '@/entities/shared/domain/repository/GetterRepository.abstract'
import { type RegionDto } from '@/entities/locations/region/domain/dto/region.dto'
import { type RegionId } from '@/entities/locations/region/domain/value-object/RegionId'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'

export abstract class RegionGetRepository extends GetRepository<Primitives<RegionId>, RegionDto> {}
