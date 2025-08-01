import { GetAllRepository } from '@/entities/shared/domain/repository/GetAllRepository.abstract'
import { type CategoryDto } from '../dto/Category.dto'

export abstract class CategoryGetAllRepository extends GetAllRepository<CategoryDto> {}
