import { GetAllRepository } from '@/entities/shared/domain/repository/GetAllRepository.abstract'
import { type ShipmentDto } from '../dto/Shipment.dto'

/**
 * `ShipmentGetAllRepository`
 * @abstract
 * @class
 * @extends {GetAllRepository<ShipmentDto>}
 * @description Contrato (interfaz abstracta) para un repositorio que permite obtener todas las entidades `Shipment`.
 * Define el método `getAll` que debe ser implementado por los adaptadores de infraestructura.
 */
export abstract class ShipmentGetAllRepository extends GetAllRepository<ShipmentDto> {}
