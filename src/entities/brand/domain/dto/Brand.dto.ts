import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type BrandId } from '../value-object/BrandId'
import { type BrandName } from '../value-object/BrandName'
import { type CategoryId } from '@/entities/category/domain/value-object/CategoryId'
import { type Category } from '@/entities/category/domain/dto/Category.dto'

/**
 * @interface Brand
 * @description Representa la entidad de dominio `Brand` con sus propiedades básicas.
 * @property {Primitives<BrandId>} id - El identificador único de la marca.
 * @property {Primitives<BrandName>} name - El nombre de la marca.
 */
export interface Brand {
	id: Primitives<BrandId>
	name: Primitives<BrandName>
}

/**
 * @typedef {Object} BrandParams
 * @description Representa los parámetros para crear o actualizar una entidad `Brand`.
 * Incluye todas las propiedades de `BrandPrimitives` y opcionalmente el `id`.
 * @property {Primitives<BrandId>} [id] - El identificador único de la marca (opcional para creación).
 * @property {Primitives<BrandName>} name - El nombre de la marca.
 * @property {Primitives<CategoryId>[]} categories - Un array de IDs de categorías asociadas a la marca.
 */
export type BrandParams = BrandPrimitives & {
	id?: Primitives<BrandId> | undefined
	categories: Primitives<CategoryId>[]
}

/**
 * @typedef {Object} BrandPrimitives
 * @description Representa la forma primitiva de una entidad `Brand` para la persistencia.
 * Excluye el `id` ya que puede ser generado por el sistema de persistencia.
 * @property {Primitives<BrandName>} name - El nombre de la marca.
 * @property {Primitives<CategoryId>[]} categories - Un array de IDs de categorías asociadas a la marca.
 */
export type BrandPrimitives = Omit<Brand, 'id'> & {
	categories: Primitives<CategoryId>[]
}

/**
 * @interface BrandDto
 * @description Representa el Data Transfer Object (DTO) de una entidad `Brand`.
 * Incluye todas las propiedades de `Brand` más las categorías completas y la fecha de última actualización.
 * @extends {Brand}
 * @property {Category[]} categories - Un array de objetos `Category` completos asociados a la marca.
 * @property {string} updatedAt - La fecha y hora de la última actualización de la marca.
 */
export type BrandDto = Brand & {
	categories: Category[]
	updatedAt: string
}
