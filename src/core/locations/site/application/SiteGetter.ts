import { type SiteDto } from '../domain/dto/Site.dto'
import { type SiteId } from '../domain/value-object/SiteId'
import { GetBaseService } from '@/core/shared/domain/methods/getter.abstract'

export class SiteGetter extends GetBaseService<SiteId, SiteDto> {}
