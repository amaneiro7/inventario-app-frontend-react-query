import { GetAllBaseService } from '@/entities/shared/domain/methods/getAll.abstract'
import { type HardDriveTypeDto } from '../domain/dto/HardDriveType.dto'

/**
 * @class HardDriveTypeGetAll
 * @extends {GetAllBaseService<HardDriveTypeDto>}
 * @description Servicio de aplicación para obtener todas las entidades `HardDriveType`.
 * Extiende de `GetAllBaseService` para reutilizar la lógica común de obtención de todos los elementos.
 */
export class HardDriveTypeGetAll extends GetAllBaseService<HardDriveTypeDto> {}