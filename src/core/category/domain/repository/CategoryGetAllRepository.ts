import { GetAllRepository } from '@/core/shared/domain/repository/GetAllRepository.abstract'
import { type CategoryDTO } from '../dto/Category.dto'

export abstract class CategoryGetAllRepository extends GetAllRepository<CategoryDTO> {}
