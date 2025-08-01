import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type SiteDto } from '../domain/dto/Site.dto'
import { type SiteId } from '../domain/value-object/SiteId'
import { GetBaseService } from '@/entities/shared/domain/methods/getter.abstract'

export class SiteGetter extends GetBaseService<Primitives<SiteId>, SiteDto> {}
