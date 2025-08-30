import { GetAllBaseService } from '@/entities/shared/domain/methods/getAll.abstract'
import { type ShipmentDto } from '../domain/dto/Shipment.dto'

/**
 * `ShipmentGetAll`
 * @class
 * @extends {GetAllBaseService<ShipmentDto>}
 * @description Servicio de aplicación para obtener todas las entidades `Shipment`.
 * Extiende de `GetAllBaseService` para reutilizar la lógica común de obtención de todos los elementos.
 */
export class ShipmentGetAll extends GetAllBaseService<ShipmentDto> {}
