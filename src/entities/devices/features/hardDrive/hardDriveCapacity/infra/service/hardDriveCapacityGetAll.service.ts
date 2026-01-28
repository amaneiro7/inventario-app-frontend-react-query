import { fetching } from '@/shared/api/api'
import { type HardDriveCapacityDto } from '@/entities/devices/features/hardDrive/hardDriveCapacity/domain/dto/HardDriveCapacity.dto'
import { type HardDriveCapacityGetAllRepository } from '@/entities/devices/features/hardDrive/hardDriveCapacity/domain/repository/HardDriveCapacityGetAllRepository'
import { type Response } from '@/entities/shared/domain/methods/Response'
import { hardDriveCapacityUrl } from '@/entities/devices/features/hardDrive/hardDriveCapacity/domain/entity/baseUrl'

/**
 * @class HardDriveCapacityGetAllService
 * @implements {HardDriveCapacityGetAllRepository}
 * @description Implementación concreta del repositorio `HardDriveCapacityGetAllRepository` para obtener todas las capacidades de disco duro.
 * Utiliza la función `fetching` para realizar la petición HTTP a la API.
 */
export class HardDriveCapacityGetAllService implements HardDriveCapacityGetAllRepository {
	/**
	 * Obtiene todas las capacidades de disco duro, opcionalmente filtradas por parámetros de consulta.
	 * @param {string} queryParams - Cadena de parámetros de consulta para filtrar los resultados.
	 * @returns {Promise<Response<HardDriveCapacityDto>>} Una promesa que se resuelve con un objeto de respuesta que contiene las capacidades de disco duro.
	 */ async getAll(queryParams: string): Promise<Response<HardDriveCapacityDto>> {
		return await fetching({
			url: `${hardDriveCapacityUrl}?${queryParams}`,
			method: 'GET'
		})
	}
}
