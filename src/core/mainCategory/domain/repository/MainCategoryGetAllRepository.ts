import { GetAllRepository } from '@/core/shared/domain/repository/GetAllRepository.abstract'
import { type MainCategoryDTO } from '../dto/MainCategory.dto'

export abstract class MainCategoryGetAllRepository extends GetAllRepository<MainCategoryDTO> {}
