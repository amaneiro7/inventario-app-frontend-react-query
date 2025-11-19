import { GetAllBaseService } from '@/entities/shared/domain/methods/getAll.abstract'
import { type PermissionDto } from '../domain/dto/Permission.dto'

/**
 * `PermissionGetAll`
 * @class
 * @extends {GetAllBaseService<PermissionDto>}
 * @description Servicio de aplicación para obtener todas las entidades `Permission`.
 * Extiende de `GetAllBaseService` para reutilizar la lógica común de obtención de todos los elementos.
 */
export class PermissionGetAll extends GetAllBaseService<PermissionDto> {}
