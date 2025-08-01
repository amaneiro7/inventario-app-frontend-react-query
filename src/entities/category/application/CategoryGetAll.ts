import { GetAllBaseService } from '@/entities/shared/domain/methods/getAll.abstract'
import { type CategoryDto } from '../domain/dto/Category.dto'

export class CategoryGetAll extends GetAllBaseService<CategoryDto> {}
