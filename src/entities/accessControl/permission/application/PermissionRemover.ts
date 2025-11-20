import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type PermissionId } from '../domain/value-object/PermissionId'
import { DeleteBaseService } from '@/entities/shared/domain/methods/remover.abstract'

/**
 * `PermissionRemover`
 * @class
 * @extends {DeleteBaseService<Primitives<PermissionId>, void>}
 * @description Servicio de aplicación para eliminar una entidad `Permission` por su ID.
 * Extiende de `DeleteBaseService` para reutilizar la lógica común de eliminación por ID.
 */
export class PermissionRemover extends DeleteBaseService<Primitives<PermissionId>, void> {}
