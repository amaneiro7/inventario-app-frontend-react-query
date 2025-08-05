import { fetching } from '@/shared/api/api'
import { type HardDriveTypeDto } from '../../domain/dto/HardDriveType.dto'
import { type HardDriveTypeGetAllRepository } from '../../domain/repository/HardDriveTypeGetAllRepository'
import { type Response } from '@/entities/shared/domain/methods/Response'
import { hardDriveTypeUrl } from '../../domain/entity/baseUrl'

/**
 * @class HardDriveTypeGetAllService
 * @implements {HardDriveTypeGetAllRepository}
 * @description Implementación concreta del repositorio `HardDriveTypeGetAllRepository` para obtener todos los tipos de disco duro.
 * Utiliza la función `fetching` para realizar la petición HTTP a la API.
 */
export class HardDriveTypeGetAllService implements HardDriveTypeGetAllRepository {
	/**
	 * Obtiene todos los tipos de disco duro, opcionalmente filtrados por parámetros de consulta.
	 * @param {string} queryParams - Cadena de parámetros de consulta para filtrar los resultados.
	 * @returns {Promise<Response<HardDriveTypeDto>>} Una promesa que se resuelve con un objeto de respuesta que contiene los tipos de disco duro.
	 */	async getAll(queryParams: string): Promise<Response<HardDriveTypeDto>> {
		return await fetching({
			url: `${hardDriveTypeUrl}?${queryParams}`,
			method: 'GET'
		})
	}
}