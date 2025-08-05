import { GetAllBaseService } from '@/entities/shared/domain/methods/getAll.abstract'
import { type DeviceMonitoringDto } from '../domain/dto/DeviceMonitoring.dto'

/**
 * @class DeviceMonitoringGetAll
 * @extends {GetAllBaseService<DeviceMonitoringDto>}
 * @description Servicio de aplicación para obtener todas las entidades `DeviceMonitoring`.
 * Extiende de `GetAllBaseService` para reutilizar la lógica común de obtención de todos los elementos.
 */
export class DeviceMonitoringGetAll extends GetAllBaseService<DeviceMonitoringDto> {}