import { GetAllBaseService } from '@/core/shared/domain/methods/getAll.abstract'
import { type BrandDto } from '../domain/dto/Processor.dto'

export class BrandGetAll extends GetAllBaseService<BrandDto> {}
