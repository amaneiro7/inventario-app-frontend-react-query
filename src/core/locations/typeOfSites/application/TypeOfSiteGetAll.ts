import { GetAllBaseService } from '@/core/shared/domain/methods/getAll.abstract'
import { type TypeOfSiteDto } from '../domain/dto/TypeOfSites.dto'

export class TypeOfSiteGetAll extends GetAllBaseService<TypeOfSiteDto> {}
