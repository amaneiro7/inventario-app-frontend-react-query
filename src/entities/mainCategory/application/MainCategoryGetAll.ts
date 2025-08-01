import { GetAllBaseService } from '@/entities/shared/domain/methods/getAll.abstract'
import { type MainCategoryDto } from '../domain/dto/MainCategory.dto'

export class MainCategoryGetAll extends GetAllBaseService<MainCategoryDto> {}
