import { type ComputerDashboardDto } from '../dto/ComputerDashboard.dto'

/**
 * @abstract
 * @class ComputerDashboardRepository
 * @description Contrato (interfaz abstracta) para un repositorio que permite obtener datos del dashboard de computadoras.
 */
export abstract class ComputerDashboardRepository {
	/**
	 * @abstract
	 * @method get
	 * @description Obtiene los datos del dashboard de computadoras.
	 * @returns {Promise<ComputerDashboardDto>} Una promesa que se resuelve con el DTO del dashboard de computadoras.
	 */	abstract get(): Promise<ComputerDashboardDto>
}