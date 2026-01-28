import { fetching } from '@/shared/api/api'
import { type GeneralDashboardRepository } from '../../domain/repository/GeneralDashboardRepository'
import { type GeneralDashboardDto } from '../../domain/dto/GeneralDashboard.dto'
import { generalDashboardUrl } from '../../domain/entity/baseUrl'

/**
 * @class GeneralDashboardService
 * @implements {GeneralDashboardRepository}
 * @description Implementación concreta del repositorio `GeneralDashboardRepository` para obtener datos del dashboard general.
 * Utiliza la función `fetching` para realizar la petición HTTP a la API.
 */
export class GeneralDashboardService implements GeneralDashboardRepository {
	/**
	 * Obtiene los datos del dashboard general.
	 * @returns {Promise<GeneralDashboardDto>} Una promesa que se resuelve con el DTO del dashboard general.
	 */ async get(): Promise<GeneralDashboardDto> {
		return await fetching<GeneralDashboardDto>({
			url: generalDashboardUrl,
			method: 'GET'
		})
	}
}
