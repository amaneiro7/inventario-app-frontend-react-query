import { Uuid } from '@/entities/shared/domain/value-objects/Uuid'

/**
 * `ShipmentId`
 * @class
 * @extends {Uuid}
 * @description Value Object que representa el identificador único de una `Shipment`.
 * Extiende de `Uuid` para asegurar que el ID sea un UUID válido.
 */
export class ShipmentId extends Uuid {}
