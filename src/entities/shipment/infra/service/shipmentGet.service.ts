import { fetching } from '@/shared/api/api'
import { shipmentUrl } from '../../domain/entity/baseUrl'
import { type ShipmentGetRepository } from '../../domain/repository/ShipmentGetRepository'
import { type ShipmentDto } from '../../domain/dto/Shipment.dto'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type ShipmentId } from '../../domain/value-object/ShipmentId'

/**
 * `ShipmentGetService`
 * @class
 * @implements {ShipmentGetRepository}
 * @description Implementación concreta del repositorio `ShipmentGetRepository` para obtener una marca.
 * Utiliza la función `fetching` para realizar la petición HTTP a la API.
 */
export class ShipmentGetService implements ShipmentGetRepository {
	/**
	 * Obtiene una marca por su ID.
	 * @param {{ id: Primitives<ShipmentId> }} props - Objeto que contiene el ID de la marca.
	 * @returns {Promise<ShipmentDto>} Una promesa que se resuelve con el DTO de la marca encontrada.
	 */ async getById({ id }: { id: Primitives<ShipmentId> }): Promise<ShipmentDto> {
		return await fetching<ShipmentDto>({
			url: `${shipmentUrl}/${id}`,
			method: 'GET'
		})
	}
}
