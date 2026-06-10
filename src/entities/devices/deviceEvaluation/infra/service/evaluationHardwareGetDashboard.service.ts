import { fetching } from '@/shared/api/api'
import { migrationRuleUrl } from '../../domain/entity/baseUrl'
import type { HardwareEvaluationRepository } from '../../domain/repository/HardwareEvaluationRepository'
import type { EvaluationHardwareDashboardResponse } from '../../domain/dto/EvaluationHardwareDashboard.dto'

/**
 * @class EvaluationHardwareDashboardService
 * @implements {HardwareEvaluationRepository}
 * @description Implementación concreta del repositorio `HardwareEvaluationRepository` para obtener datos del dashboard de computadoras.
 * Utiliza la función `fetching` para realizar la petición HTTP a la API.
 */
export class EvaluationHardwareDashboardService implements HardwareEvaluationRepository {
	/**
	 * Obtiene los datos del dashboard de computadoras.
	 * @param {string} [queryParams] - Cadena de parámetros de consulta para filtrar los resultados.
	 * @returns {Promise<EvaluationHardwareDashboardResponse>} Una promesa que se resuelve con un objeto de respuesta que contiene las monitorizaciones de dispositivos.
	 */
	async findPendingDevices(queryParams?: string): Promise<EvaluationHardwareDashboardResponse> {
		return await fetching({
			url: `${migrationRuleUrl}/dashboard/pending-devices?${queryParams}`,
			method: 'GET'
		})
	}
}
