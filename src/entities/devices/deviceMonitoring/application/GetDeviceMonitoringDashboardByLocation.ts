import { type DeviceMonitoringDashboardByLocationDto } from '../domain/dto/DeviceMonitoringDashboardByLocation.dto'
import { type DeviceMonitoringDashboardByLocationRepository } from '../domain/repository/DeviceMonitoringDashboardByLocationRepository'
import {
	createDeviceMonitoringParams,
	type DeviceMonitoringFilters
} from './createDeviceMonitoringQueryParams'

/**
 * @class GetDeviceMonitoringDashboardByLocation
 * @description Servicio de aplicación para obtener los datos del dashboard de monitoreo de dispositivos por ubicación.
 */
export class GetDeviceMonitoringDashboardByLocation {
	/**
	 * @param {DeviceMonitoringDashboardByLocationRepository} deviceMonitoringDashboardByLocationRepository - El repositorio para obtener los datos del dashboard de monitoreo de dispositivos por ubicación.
	 */ constructor(
		private readonly deviceMonitoringDashboardByLocationRepository: DeviceMonitoringDashboardByLocationRepository
	) {}

	/**
	 * Ejecuta la obtención de los datos del dashboard de monitoreo de dispositivos por ubicación.
	 * Construye los parámetros de la consulta y delega la ejecución al repositorio.
	 * @param {DeviceMonitoringFilters} filters - Los filtros a aplicar en la consulta.
	 * @returns {Promise<DeviceMonitoringDashboardByLocationDto[]>} Una promesa que se resuelve con un array de DTOs del dashboard de monitoreo de dispositivos por ubicación.
	 */ async execute({
		pageNumber,
		pageSize,
		orderBy,
		orderType,
		...query
	}: DeviceMonitoringFilters): Promise<DeviceMonitoringDashboardByLocationDto[]> {
		const queryParams = await createDeviceMonitoringParams(query)
		return await this.deviceMonitoringDashboardByLocationRepository.get(queryParams)
	}
}
