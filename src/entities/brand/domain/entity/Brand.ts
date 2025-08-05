import { BrandName } from '../value-object/BrandName'
import { CategoryId } from '@/entities/category/domain/value-object/CategoryId'
import { type BrandPrimitives } from '../dto/Brand.dto'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'

/**
 * `Brand`
 * @class
 * @description Representa la entidad de dominio `Brand`.
 * Encapsula la lógica de negocio y las reglas de validación para una marca.
 */
export class Brand {
	/**
	 * Crea una instancia de `Brand`.
	 * @param {BrandName} name - El nombre de la marca como un Value Object.
	 * @param {CategoryId[]} categories - Un array de IDs de categorías como Value Objects.
	 */ constructor(
		private readonly name: BrandName,
		private readonly categories: CategoryId[]
	) {}

	/**
	 * Crea una nueva instancia de `Brand` a partir de sus propiedades primitivas.
	 * @param {BrandPrimitives} params - Las propiedades primitivas de la marca.
	 * @returns {Brand} Una nueva instancia de `Brand`.
	 */ static create(params: BrandPrimitives): Brand {
		return new Brand(
			new BrandName(params.name),
			params.categories.map(categoryId => new CategoryId(categoryId))
		)
	}

	/**
	 * Obtiene el valor primitivo del nombre de la marca.
	 * @type {Primitives<BrandName>}
	 */ get nameValue(): Primitives<BrandName> {
		return this.name.value
	}

	/**
	 * Obtiene los valores primitivos de los IDs de las categorías asociadas.
	 * @type {Primitives<CategoryId>[]}
	 */ get categoriesValue(): Primitives<CategoryId>[] {
		return this.categories.map(c => c.value)
	}

	/**
	 * Convierte la entidad `Brand` a su representación primitiva.
	 * @returns {BrandPrimitives} La representación primitiva de la marca.
	 */ toPrimitives(): BrandPrimitives {
		return {
			name: this.name.value,
			categories: this.categoriesValue
		}
	}
}
