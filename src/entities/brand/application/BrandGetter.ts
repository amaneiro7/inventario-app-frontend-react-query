import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type BrandDto } from '../domain/dto/Brand.dto'
import { type BrandId } from '../domain/value-object/BrandId'
import { GetBaseService } from '@/entities/shared/domain/methods/getter.abstract'

export class BrandGetter extends GetBaseService<Primitives<BrandId>, BrandDto> {}
