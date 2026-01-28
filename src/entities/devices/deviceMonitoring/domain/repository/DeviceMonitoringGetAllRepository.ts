import { type DeviceMonitoringDto } from '../dto/DeviceMonitoring.dto'
import { GetAllRepository } from '@/entities/shared/domain/repository/GetAllRepository.abstract'

/**
 * @abstract
 * @class DeviceMonitoringGetAllRepository
 * @extends {GetAllRepository<DeviceMonitoringDto>}
 * @description Contrato (interfaz abstracta) para un repositorio que permite obtener todas las entidades `DeviceMonitoring`.
 * Define el método `getAll` que debe ser implementado por los adaptadores de infraestructura.
 */
export abstract class DeviceMonitoringGetAllRepository extends GetAllRepository<DeviceMonitoringDto> {}
