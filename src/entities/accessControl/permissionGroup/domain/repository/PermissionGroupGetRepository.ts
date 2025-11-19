import { GetRepository } from '@/entities/shared/domain/repository/GetterRepository.abstract'
import { type PermissionGroupDto } from '../dto/PermissionGroup.dto'
import { type PermissionGroupId } from '../value-object/PermissionGroupId'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'

/**
 * `PermissionGroupGetRepository`
 * @abstract
 * @class
 * @extends {GetRepository<Primitives<PermissionGroupId>, PermissionGroupDto>}
 * @description Contrato (interfaz abstracta) para un repositorio que permite obtener una entidad `PermissionGroup` por su ID.
 * Define el método `getById` que debe ser implementado por los adaptadores de infraestructura.
 */
export abstract class PermissionGroupGetRepository extends GetRepository<
	Primitives<PermissionGroupId>,
	PermissionGroupDto
> {}
