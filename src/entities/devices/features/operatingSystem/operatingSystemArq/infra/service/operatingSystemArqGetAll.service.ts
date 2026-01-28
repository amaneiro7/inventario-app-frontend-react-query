import { fetching } from '@/shared/api/api'
import { type OperatingSystemArqDto } from '../../domain/dto/OperatingSystemArq.dto'
import { type OperatingSystemArqGetAllRepository } from '../../domain/repository/OperatingSystemArqGetAllRepository'
import { type Response } from '@/entities/shared/domain/methods/Response'
import { operatingSystemArqUrl } from '../../domain/entity/baseUrl'

/**
 * @class OperatingSystemArqGetAllService
 * @implements {OperatingSystemArqGetAllRepository}
 * @description Implementación concreta del repositorio `OperatingSystemArqGetAllRepository` para obtener todas las arquitecturas de sistema operativo.
 * Utiliza la función `fetching` para realizar la petición HTTP a la API.
 */
export class OperatingSystemArqGetAllService implements OperatingSystemArqGetAllRepository {
	/**
	 * Obtiene todas las arquitecturas de sistema operativo, opcionalmente filtradas por parámetros de consulta.
	 * @param {string} queryParams - Cadena de parámetros de consulta para filtrar los resultados.
	 * @returns {Promise<Response<OperatingSystemArqDto>>} Una promesa que se resuelve con un objeto de respuesta que contiene las arquitecturas de sistema operativo.
	 */ async getAll(queryParams: string): Promise<Response<OperatingSystemArqDto>> {
		return await fetching({
			url: `${operatingSystemArqUrl}?${queryParams}`,
			method: 'GET'
		})
	}
}
