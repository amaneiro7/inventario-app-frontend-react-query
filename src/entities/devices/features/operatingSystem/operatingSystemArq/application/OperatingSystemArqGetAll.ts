import { GetAllBaseService } from '@/entities/shared/domain/methods/getAll.abstract'
import { type OperatingSystemArqDto } from '../domain/dto/OperatingSystemArq.dto'

/**
 * @class OperatingSystemArqGetAll
 * @extends {GetAllBaseService<OperatingSystemArqDto>}
 * @description Servicio de aplicación para obtener todas las entidades `OperatingSystemArq`.
 * Extiende de `GetAllBaseService` para reutilizar la lógica común de obtención de todos los elementos.
 */
export class OperatingSystemArqGetAll extends GetAllBaseService<OperatingSystemArqDto> {}