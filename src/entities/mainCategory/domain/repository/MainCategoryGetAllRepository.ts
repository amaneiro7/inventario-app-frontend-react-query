import { GetAllRepository } from '@/entities/shared/domain/repository/GetAllRepository.abstract'
import { type MainCategoryDto } from '../dto/MainCategory.dto'

export abstract class MainCategoryGetAllRepository extends GetAllRepository<MainCategoryDto> {}
