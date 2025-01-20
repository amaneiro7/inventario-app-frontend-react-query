import { type BrandDTO } from '../domain/dto/Brand.dto'
import { type BrandId } from '../domain/value-object/BrandId'
import { GetBaseService } from '@/core/shared/domain/methods/getter.abstract'

export class BrandGetter extends GetBaseService<BrandId, BrandDTO> {}
