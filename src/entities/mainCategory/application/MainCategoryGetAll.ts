import { GetAllBaseService } from '@/entities/shared/domain/methods/getAll.abstract'
import { type MainCategoryDto } from '../domain/dto/MainCategory.dto'

/**
 * Service class for retrieving all MainCategory entities.
 * It extends GetAllBaseService, providing generic functionality for fetching all records
 * of type MainCategoryDto.
 */
export class MainCategoryGetAll extends GetAllBaseService<MainCategoryDto> {}
