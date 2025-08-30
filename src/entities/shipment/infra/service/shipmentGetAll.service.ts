import { fetching } from '@/shared/api/api'
import { type ShipmentGetAllRepository } from '../../domain/repository/ShipmentGetAllRepository'
import { type ShipmentDto } from '../../domain/dto/Shipment.dto'
import { type Response } from '@/entities/shared/domain/methods/Response'
import { shipmentUrl } from '../../domain/entity/baseUrl'

/**
 * `ShipmentGetAllService`
 * @class
 * @implements {ShipmentGetAllRepository}
 * @description Implementación concreta del repositorio `ShipmentGetAllRepository` para obtener todas las marcas.
 * Utiliza la función `fetching` para realizar la petición HTTP a la API.
 */
export class ShipmentGetAllService implements ShipmentGetAllRepository {
	/**
	 * Obtiene todas las marcas, opcionalmente filtradas por parámetros de consulta.
	 * @param {string} [queryParams] - Cadena de parámetros de consulta para filtrar los resultados.
	 * @returns {Promise<Response<ShipmentDto>>} Una promesa que se resuelve con un objeto de respuesta que contiene las marcas.
	 */ async getAll(queryParams?: string): Promise<Response<ShipmentDto>> {
		return await fetching({ url: `${shipmentUrl}?${queryParams}`, method: 'GET' })
	}
}
