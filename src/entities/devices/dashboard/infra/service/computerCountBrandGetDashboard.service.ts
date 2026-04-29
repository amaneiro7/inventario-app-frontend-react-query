import { fetching } from '@/shared/api/api'
import { computerCountBrandDashboardUrl } from '../../domain/entity/baseUrl'
import type { ComputerCountBrandDashboardDto } from '../../domain/dto/ComputerCountBrandDashboard'
import type { ComputerCountBrandDashboardRepository } from '../../domain/repository/ComputerCountBrandDashboardRepository'
import type { Response } from '@/entities/shared/domain/methods/Response'

/**
 * @class ComputerCountBrandDashboardService
 * @implements {ComputerCountBrandDashboardRepository}
 * @description Implementación concreta del repositorio `ComputerCountBrandDashboardRepository` para obtener datos del dashboard de computadoras.
 * Utiliza la función `fetching` para realizar la petición HTTP a la API.
 */
export class ComputerCountBrandDashboardService implements ComputerCountBrandDashboardRepository {
	/**
	 * Obtiene los datos del dashboard de computadoras.
	 * @returns {Promise<ComputerCountBrandDashboardDto>} Una promesa que se resuelve con el DTO del dashboard de computadoras.
	 */
	async getAll(queryParams: string): Promise<Response<ComputerCountBrandDashboardDto>> {
		return await fetching({
			url: `${computerCountBrandDashboardUrl}?${queryParams}`,
			method: 'GET'
		})
	}
}
