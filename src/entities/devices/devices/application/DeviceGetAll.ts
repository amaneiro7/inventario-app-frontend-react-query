import { GetAllBaseService } from '@/entities/shared/domain/methods/getAll.abstract'
import { type DeviceDto } from '../domain/dto/Device.dto'

/**
 * @class DeviceGetAll
 * @extends {GetAllBaseService<DeviceDto>}
 * @description Servicio de aplicación para obtener todas las entidades `Device`.
 * Extiende de `GetAllBaseService` para reutilizar la lógica común de obtención de todos los elementos.
 */
export class DeviceGetAll extends GetAllBaseService<DeviceDto> {}
