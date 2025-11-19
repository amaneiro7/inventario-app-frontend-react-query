import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type PermissionDto } from '../domain/dto/Permission.dto'
import { type PermissionId } from '../domain/value-object/PermissionId'
import { GetBaseService } from '@/entities/shared/domain/methods/getter.abstract'

/**
 * `PermissionGetter`
 * @class
 * @extends {GetBaseService<Primitives<PermissionId>, PermissionDto>}
 * @description Servicio de aplicación para obtener una entidad `Permission` por su ID.
 * Extiende de `GetBaseService` para reutilizar la lógica común de obtención por ID.
 */
export class PermissionGetter extends GetBaseService<Primitives<PermissionId>, PermissionDto> {}
