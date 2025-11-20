import { DeleteRepository } from '@/entities/shared/domain/repository/DeleteRepository.abstract'
import { type PermissionId } from '../value-object/PermissionId'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'

/**
 * `PermissionDeleteRepository`
 * @abstract
 * @class
 * @extends {DeleteRepository<Primitives<PermissionId>, void>}
 * @description Contrato (interfaz abstracta) para un repositorio que permite eliminar una entidad `Permission` por su ID.
 * Define el método `deleteById` que debe ser implementado por los adaptadores de infraestructura.
 */
export abstract class PermissionDeleteRepository extends DeleteRepository<
	Primitives<PermissionId>,
	void
> {}
