import { type GeneralDashboardDto } from '../dto/GeneralDashboard.dto'

/**
 * @abstract
 * @class GeneralDashboardRepository
 * @description Contrato (interfaz abstracta) para un repositorio que permite obtener datos del dashboard general.
 */
export abstract class GeneralDashboardRepository {
	/**
	 * @abstract
	 * @method get
	 * @description Obtiene los datos del dashboard general.
	 * @returns {Promise<GeneralDashboardDto>} Una promesa que se resuelve con el DTO del dashboard general.
	 */ abstract get(): Promise<GeneralDashboardDto>
}
