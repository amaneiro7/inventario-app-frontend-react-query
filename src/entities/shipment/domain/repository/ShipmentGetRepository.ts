import { GetRepository } from '@/entities/shared/domain/repository/GetterRepository.abstract'
import { type ShipmentDto } from '../dto/Shipment.dto'
import { type ShipmentId } from '../value-object/ShipmentId'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'

/**
 * `ShipmentGetRepository`
 * @abstract
 * @class
 * @extends {GetRepository<Primitives<ShipmentId>, ShipmentDto>}
 * @description Contrato (interfaz abstracta) para un repositorio que permite obtener una entidad `Shipment` por su ID.
 * Define el método `getById` que debe ser implementado por los adaptadores de infraestructura.
 */
export abstract class ShipmentGetRepository extends GetRepository<
	Primitives<ShipmentId>,
	ShipmentDto
> {}
