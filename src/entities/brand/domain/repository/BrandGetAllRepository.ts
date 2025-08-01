import { GetAllRepository } from '@/entities/shared/domain/repository/GetAllRepository.abstract'
import { type BrandDto } from '../dto/Brand.dto'

export abstract class BrandGetAllRepository extends GetAllRepository<BrandDto> {}
