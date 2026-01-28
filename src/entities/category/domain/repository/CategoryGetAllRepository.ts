import { GetAllRepository } from '@/entities/shared/domain/repository/GetAllRepository.abstract'
import { type CategoryDto } from '../dto/Category.dto'

/**
 * `CategoryGetAllRepository`
 * @abstract
 * @class
 * @extends {GetAllRepository<CategoryDto>}
 * @description Contrato (interfaz abstracta) para un repositorio que permite obtener todas las entidades `Category`.
 * Define el método `getAll` que debe ser implementado por los adaptadores de infraestructura.
 */
export abstract class CategoryGetAllRepository extends GetAllRepository<CategoryDto> {}
