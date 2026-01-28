import { GetAllBaseService } from '@/entities/shared/domain/methods/getAll.abstract'
import { type OperatingSystemDto } from '../domain/dto/OperatingSystem.dto'

/**
 * @class OperatingSystemGetAll
 * @extends {GetAllBaseService<OperatingSystemDto>}
 * @description Servicio de aplicación para obtener todas las entidades `OperatingSystem`.
 * Extiende de `GetAllBaseService` para reutilizar la lógica común de obtención de todos los elementos.
 */
export class OperatingSystemGetAll extends GetAllBaseService<OperatingSystemDto> {}
