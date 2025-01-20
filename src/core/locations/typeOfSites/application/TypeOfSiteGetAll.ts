import { GetAllBaseService } from '@/core/shared/domain/methods/getAll.abstract'
import { type TypeOfSiteDto } from '../domain/dto/TypeOFSite.dto'

export class TypeOfSiteGetAll extends GetAllBaseService<TypeOfSiteDto> {}
