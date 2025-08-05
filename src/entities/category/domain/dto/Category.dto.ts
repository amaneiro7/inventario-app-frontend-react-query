import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type CategoryId } from '../value-object/CategoryId'
import { type CategoryName } from '../value-object/CategoryName'
import { type MainCategoryId } from '@/entities/mainCategory/domain/value-object/MainCategoryId'
import { type MainCategoryDto } from '@/entities/mainCategory/domain/dto/MainCategory.dto'

/**
 * @interface Category
 * @description Representa la entidad de dominio `Category` con sus propiedades básicas.
 * @property {Primitives<CategoryId>} id - El identificador único de la categoría.
 * @property {Primitives<CategoryName>} name - El nombre de la categoría.
 * @property {Primitives<MainCategoryId>} mainCategoryId - El identificador de la categoría principal a la que pertenece.
 */
export interface Category {
	id: Primitives<CategoryId>
	name: Primitives<CategoryName>
	mainCategoryId: Primitives<MainCategoryId>
}

/**
 * @typedef {Object} CategoryPrimitives
 * @description Representa la forma primitiva de una entidad `Category` para la persistencia.
 * Excluye el `id` ya que puede ser generado por el sistema de persistencia.
 * @property {Primitives<CategoryName>} name - El nombre de la categoría.
 * @property {Primitives<MainCategoryId>} mainCategoryId - El identificador de la categoría principal a la que pertenece.
 */
export type CategoryPrimitives = Omit<Category, 'id'>

/**
 * @interface CategoryDto
 * @description Representa el Data Transfer Object (DTO) de una entidad `Category`.
 * Incluye todas las propiedades de `Category` más el objeto `MainCategory` completo.
 * @extends {Category}
 * @property {MainCategoryDto} mainCategory - El objeto `MainCategory` completo asociado a la categoría.
 */
export type CategoryDto = Category & {
	mainCategory: MainCategoryDto
}
