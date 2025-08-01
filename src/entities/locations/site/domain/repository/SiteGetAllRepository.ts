import { type SiteDto } from '../dto/Site.dto'
import { GetAllRepository } from '@/entities/shared/domain/repository/GetAllRepository.abstract'

export abstract class SiteGetAllRepository extends GetAllRepository<SiteDto> {}
