import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type PermissionGroupId } from '../domain/value-object/PermissionGroupId'
import { DeleteBaseService } from '@/entities/shared/domain/methods/remover.abstract'

/**
 * `PermissionGroupRemover`
 * @class
 * @extends {DeleteBaseService<Primitives<PermissionGroupId>, void>}
 * @description Servicio de aplicación para eliminar una entidad `PermissionGroup` por su ID.
 * Extiende de `DeleteBaseService` para reutilizar la lógica común de eliminación por ID.
 */
export class PermissionGroupRemover extends DeleteBaseService<
	Primitives<PermissionGroupId>,
	void
> {}
