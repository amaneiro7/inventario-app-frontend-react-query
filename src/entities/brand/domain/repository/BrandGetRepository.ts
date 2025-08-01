import { GetRepository } from '@/entities/shared/domain/repository/GetterRepository.abstract'
import { type BrandDto } from '../dto/Brand.dto'
import { type BrandId } from '../value-object/BrandId'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'

export abstract class BrandGetRepository extends GetRepository<Primitives<BrandId>, BrandDto> {}
