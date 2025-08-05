import { GetAllRepository } from '@/entities/shared/domain/repository/GetAllRepository.abstract'
import { type MainCategoryDto } from '../dto/MainCategory.dto'

/**
 * Abstract class for a repository that provides methods for retrieving all MainCategory entities.
 * It extends the generic `GetAllRepository` with `MainCategoryDto` as the type parameter.
 */
export abstract class MainCategoryGetAllRepository extends GetAllRepository<MainCategoryDto> {}