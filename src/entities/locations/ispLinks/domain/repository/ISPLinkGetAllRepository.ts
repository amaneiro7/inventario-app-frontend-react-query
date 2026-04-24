import { GetAllRepository } from '@/entities/shared/domain/repository/GetAllRepository.abstract'
import { type ISPLinkDto } from '../dto/ISPLink.dto'

export abstract class ISPLinkGetAllRepository extends GetAllRepository<ISPLinkDto> {}
