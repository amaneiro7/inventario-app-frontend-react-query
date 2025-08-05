import { GetAllRepository } from '@/entities/shared/domain/repository/GetAllRepository.abstract'
import { type DeviceDto } from '../dto/Device.dto'

/**
 * @abstract
 * @class DeviceGetAllRepository
 * @extends {GetAllRepository<DeviceDto>}
 * @description Contrato (interfaz abstracta) para un repositorio que permite obtener todas las entidades `Device`.
 * Define el método `getAll` que debe ser implementado por los adaptadores de infraestructura.
 */
export abstract class DeviceGetAllRepository extends GetAllRepository<DeviceDto> {}