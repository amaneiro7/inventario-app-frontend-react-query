import { GetAllBaseService } from '@/entities/shared/domain/methods/getAll.abstract'
import { type PermissionGroupDto } from '../domain/dto/PermissionGroup.dto'

/**
 * `PermissionGroupGetAll`
 * @class
 * @extends {GetAllBaseService<PermissionGroupDto>}
 * @description Servicio de aplicación para obtener todas las entidades `PermissionGroup`.
 * Extiende de `GetAllBaseService` para reutilizar la lógica común de obtención de todos los elementos.
 */
export class PermissionGroupGetAll extends GetAllBaseService<PermissionGroupDto> {}
