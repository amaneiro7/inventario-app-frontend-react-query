import { type DeviceMonitoringDashboardByStateDto } from '../domain/dto/DeviceMonitoringDashboardByState.dto'
import { type DeviceMonitoringDashboardByStateRepository } from '../domain/repository/DeviceMonitoringDashboardByStateRepository'
import {
	createDeviceMonitoringParams,
	type DeviceMonitoringFilters
} from './createDeviceMonitoringQueryParams'

/**
 * @class GetDeviceMonitoringDashboardByState
 * @description Servicio de aplicación para obtener los datos del dashboard de monitoreo de dispositivos por estado.
 */
export class GetDeviceMonitoringDashboardByState {
	/**
	 * @param {DeviceMonitoringDashboardByStateRepository} deviceMonitoringDashboardByStateRepository - El repositorio para obtener los datos del dashboard de monitoreo de dispositivos por estado.
	 */	constructor(
		private readonly deviceMonitoringDashboardByStateRepository: DeviceMonitoringDashboardByStateRepository
	) {}

	/**
	 * Ejecuta la obtención de los datos del dashboard de monitoreo de dispositivos por estado.
	 * Construye los parámetros de la consulta y delega la ejecución al repositorio.
	 * @param {DeviceMonitoringFilters} filters - Los filtros a aplicar en la consulta.
	 * @returns {Promise<DeviceMonitoringDashboardByStateDto>} Una promesa que se resuelve con el DTO del dashboard de monitoreo de dispositivos por estado.
	 */	async execute({
		pageNumber,
		pageSize,
		orderBy,
		orderType,
		...query
	}: DeviceMonitoringFilters): Promise<DeviceMonitoringDashboardByStateDto> {
		const queryParams = await createDeviceMonitoringParams(query)
		return await this.deviceMonitoringDashboardByStateRepository.get(queryParams)
	}
}