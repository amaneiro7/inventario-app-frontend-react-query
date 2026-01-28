import { GetAllBaseService } from '@/entities/shared/domain/methods/getAll.abstract'
import { type HardDriveCapacityDto } from '../domain/dto/HardDriveCapacity.dto'

/**
 * @class HardDriveCapacityGetAll
 * @extends {GetAllBaseService<HardDriveCapacityDto>}
 * @description Servicio de aplicación para obtener todas las entidades `HardDriveCapacity`.
 * Extiende de `GetAllBaseService` para reutilizar la lógica común de obtención de todos los elementos.
 */
export class HardDriveCapacityGetAll extends GetAllBaseService<HardDriveCapacityDto> {}
