import { fetching } from '@/shared/api/api'
import { type ComputerDashboardRepository } from '../../domain/repository/ComputerDashboardRepository'
import { type ComputerDashboardDto } from '../../domain/dto/ComputerDashboard.dto'
import { computerDashboardUrl } from '../../domain/entity/baseUrl'

/**
 * @class ComputerDashboardService
 * @implements {ComputerDashboardRepository}
 * @description Implementación concreta del repositorio `ComputerDashboardRepository` para obtener datos del dashboard de computadoras.
 * Utiliza la función `fetching` para realizar la petición HTTP a la API.
 */
export class ComputerDashboardService implements ComputerDashboardRepository {
	/**
	 * Obtiene los datos del dashboard de computadoras.
	 * @returns {Promise<ComputerDashboardDto>} Una promesa que se resuelve con el DTO del dashboard de computadoras.
	 */	async get(): Promise<ComputerDashboardDto> {
		return await fetching<ComputerDashboardDto>({
			url: computerDashboardUrl,
			method: 'GET'
		})
	}
}