import { fetching } from '@/shared/api/api'
import { type ShipmentSaveRepository } from '../../domain/repository/ShipmentSaveRepository'
import { type ShipmentPrimitives } from '../../domain/dto/Shipment.dto'
import { shipmentUrl } from '../../domain/entity/baseUrl'

/**
 * `ShipmentSaveService`
 * @class
 * @implements {ShipmentSaveRepository}
 * @description Implementación concreta del repositorio `ShipmentSaveRepository` para guardar y actualizar marcas.
 * Utiliza la función `fetching` para realizar las peticiones HTTP a la API.
 */
export class ShipmentSaveService implements ShipmentSaveRepository {
	/**
	 * Guarda una nueva marca.
	 * @param {{ payload: ShipmentPrimitives }} props - Objeto que contiene los datos primitivos de la marca a guardar.
	 * @returns {Promise<{ message: string }>} Una promesa que se resuelve con un mensaje de éxito.
	 */ async save({ payload }: { payload: ShipmentPrimitives }): Promise<{ message: string }> {
		return await fetching({ method: 'POST', url: shipmentUrl, data: payload })
	}

	/**
	 * Actualiza una marca existente.
	 * @param {{ id: string; payload: ShipmentPrimitives }} props - Objeto que contiene el ID de la marca a actualizar y sus nuevos datos primitivos.
	 * @returns {Promise<{ message: string }>} Una promesa que se resuelve con un mensaje de éxito.
	 */ async update({
		id,
		payload
	}: {
		id: string
		payload: ShipmentPrimitives
	}): Promise<{ message: string }> {
		return await fetching({
			method: 'PATCH',
			url: `${shipmentUrl}/${id}`,
			data: payload
		})
	}
}
