import { GetAllBaseService } from '@/core/shared/domain/methods/getAll.abstract'
import { type SiteDto } from '../domain/dto/Site.dto'

export class SiteGetAll extends GetAllBaseService<SiteDto> {}
