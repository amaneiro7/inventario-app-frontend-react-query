import { GetAllBaseService } from '@/entities/shared/domain/methods/getAll.abstract'
import { type CategoryDto } from '../domain/dto/Category.dto'

/**
 * `CategoryGetAll`
 * @class
 * @extends {GetAllBaseService<CategoryDto>}
 * @description Servicio de aplicación para obtener todas las entidades `Category`.
 * Extiende de `GetAllBaseService` para reutilizar la lógica común de obtención de todos los elementos.
 */
export class CategoryGetAll extends GetAllBaseService<CategoryDto> {}