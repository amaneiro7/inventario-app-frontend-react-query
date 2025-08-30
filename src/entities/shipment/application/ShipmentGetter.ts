import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type ShipmentDto } from '../domain/dto/Shipment.dto'
import { type ShipmentId } from '../domain/value-object/ShipmentId'
import { GetBaseService } from '@/entities/shared/domain/methods/getter.abstract'

/**
 * `ShipmentGetter`
 * @class
 * @extends {GetBaseService<Primitives<ShipmentId>, ShipmentDto>}
 * @description Servicio de aplicación para obtener una entidad `Shipment` por su ID.
 * Extiende de `GetBaseService` para reutilizar la lógica común de obtención por ID.
 */
export class ShipmentGetter extends GetBaseService<Primitives<ShipmentId>, ShipmentDto> {}
