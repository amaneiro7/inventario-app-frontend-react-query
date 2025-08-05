import { SaveRepository } from '@/entities/shared/domain/repository/SaveRepository'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type BrandId } from '../value-object/BrandId'
import { type BrandPrimitives } from '../dto/Brand.dto'

/**
 * `BrandSaveRepository`
 * @abstract
 * @class
 * @extends {SaveRepository<Primitives<BrandId>, BrandPrimitives>}
 * @description Contrato (interfaz abstracta) para un repositorio que permite guardar o actualizar entidades `Brand`.
 * Define los métodos `save` y `update` que deben ser implementados por los adaptadores de infraestructura.
 */
export abstract class BrandSaveRepository extends SaveRepository<
	Primitives<BrandId>,
	BrandPrimitives
> {}