import { GetAllBaseService } from '@/core/shared/domain/methods/getAll.abstract'
import { type BrandDto } from '../domain/dto/Brand.dto'

export class BrandGetAll extends GetAllBaseService<BrandDto> {}
