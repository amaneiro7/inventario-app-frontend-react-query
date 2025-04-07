import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type RegionId } from '../domain/value-object/RegionId'
import { type RegionDto } from '../domain/dto/region.dto'
import { GetBaseService } from '@/core/shared/domain/methods/getter.abstract'

export class RegionGetter extends GetBaseService<Primitives<RegionId>, RegionDto> {}
