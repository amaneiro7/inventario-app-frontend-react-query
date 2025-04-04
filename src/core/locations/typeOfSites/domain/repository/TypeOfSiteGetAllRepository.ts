import { GetAllRepository } from '@/core/shared/domain/repository/GetAllRepository.abstract'
import { type TypeOfSiteDto } from '../dto/TypeOfSite.dto'

export abstract class TypeOfSiteGetAllRepository extends GetAllRepository<TypeOfSiteDto> {}
