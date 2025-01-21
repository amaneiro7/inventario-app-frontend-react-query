import { GetAllBaseService } from '@/core/shared/domain/methods/getAll.abstract'
import { type TypeOfSiteDto } from '../domain/dto/TypeOfSite.dto'

export class TypeOfSiteGetAll extends GetAllBaseService<TypeOfSiteDto> {}
