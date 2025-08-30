import { SaveRepository } from '@/entities/shared/domain/repository/SaveRepository'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type ShipmentId } from '../value-object/ShipmentId'
import { type ShipmentPrimitives } from '../dto/Shipment.dto'

/**
 * `ShipmentSaveRepository`
 * @abstract
 * @class
 * @extends {SaveRepository<Primitives<ShipmentId>, ShipmentPrimitives>}
 * @description Contrato (interfaz abstracta) para un repositorio que permite guardar o actualizar entidades `Shipment`.
 * Define los métodos `save` y `update` que deben ser implementados por los adaptadores de infraestructura.
 */
export abstract class ShipmentSaveRepository extends SaveRepository<
	Primitives<ShipmentId>,
	ShipmentPrimitives
> {}
