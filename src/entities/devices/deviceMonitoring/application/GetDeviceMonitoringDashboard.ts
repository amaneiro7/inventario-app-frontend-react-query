import { type DeviceMonitoringDashboardDto } from '../domain/dto/DeviceMonitoringDashboard.dto'
import { type DeviceMonitoringDashboardRepository } from '../domain/repository/DeviceMonitoringDashboardRepository'
import {
	createDeviceMonitoringParams,
	type DeviceMonitoringFilters
} from './createDeviceMonitoringQueryParams'

/**
 * @class GetDeviceMonitoringDashboard
 * @description Servicio de aplicación para obtener los datos del dashboard de monitoreo de dispositivos.
 */
export class GetDeviceMonitoringDashboard {
	/**
	 * @param {DeviceMonitoringDashboardRepository} deviceMonitoringDashboardRepository - El repositorio para obtener los datos del dashboard de monitoreo de dispositivos.
	 */ constructor(
		private readonly deviceMonitoringDashboardRepository: DeviceMonitoringDashboardRepository
	) {}

	/**
	 * Ejecuta la obtención de los datos del dashboard de monitoreo de dispositivos.
	 * Construye los parámetros de la consulta y delega la ejecución al repositorio.
	 * @param {DeviceMonitoringFilters} filters - Los filtros a aplicar en la consulta.
	 * @returns {Promise<DeviceMonitoringDashboardDto>} Una promesa que se resuelve con el DTO del dashboard de monitoreo de dispositivos.
	 */ async execute({
		pageNumber,
		pageSize,
		orderBy,
		orderType,
		...query
	}: DeviceMonitoringFilters): Promise<DeviceMonitoringDashboardDto> {
		const queryParams = await createDeviceMonitoringParams(query)
		return await this.deviceMonitoringDashboardRepository.get(queryParams)
	}
}
