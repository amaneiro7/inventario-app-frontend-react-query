import { DeleteRepository } from '@/entities/shared/domain/repository/DeleteRepository.abstract'
import { type PermissionGroupId } from '../value-object/PermissionGroupId'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'

/**
 * `PermissionGroupDeleteRepository`
 * @abstract
 * @class
 * @extends {DeleteRepository<Primitives<PermissionGroupId>, void>}
 * @description Contrato (interfaz abstracta) para un repositorio que permite eliminar una entidad `PermissionGroup` por su ID.
 * Define el método `deleteById` que debe ser implementado por los adaptadores de infraestructura.
 */
export abstract class PermissionGroupDeleteRepository extends DeleteRepository<
	Primitives<PermissionGroupId>,
	void
> {}
