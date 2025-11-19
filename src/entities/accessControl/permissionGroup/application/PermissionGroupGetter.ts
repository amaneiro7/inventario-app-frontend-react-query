import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type PermissionGroupDto } from '../domain/dto/PermissionGroup.dto'
import { type PermissionGroupId } from '../domain/value-object/PermissionGroupId'
import { GetBaseService } from '@/entities/shared/domain/methods/getter.abstract'

/**
 * `PermissionGroupGetter`
 * @class
 * @extends {GetBaseService<Primitives<PermissionGroupId>, PermissionGroupDto>}
 * @description Servicio de aplicación para obtener una entidad `PermissionGroup` por su ID.
 * Extiende de `GetBaseService` para reutilizar la lógica común de obtención por ID.
 */
export class PermissionGroupGetter extends GetBaseService<
	Primitives<PermissionGroupId>,
	PermissionGroupDto
> {}
