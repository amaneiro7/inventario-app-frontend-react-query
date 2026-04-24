import { GetAllBaseService } from '@/entities/shared/domain/methods/getAll.abstract'
import { type ISPLinkDto } from '../domain/dto/ISPLink.dto'

export class ISPLinkGetAll extends GetAllBaseService<ISPLinkDto> {}
