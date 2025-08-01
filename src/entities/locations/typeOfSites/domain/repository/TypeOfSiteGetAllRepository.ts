import { GetAllRepository } from '@/entities/shared/domain/repository/GetAllRepository.abstract'
import { type TypeOfSiteDto } from '../dto/TypeOfSites.dto'

export abstract class TypeOfSiteGetAllRepository extends GetAllRepository<TypeOfSiteDto> {}
