import { DeleteRepository } from '@/entities/shared/domain/repository/DeleteRepository.abstract'
import { type AccessPolicyId } from '../value-object/AccessPolicyId'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'

/**
 * `AccessPolicyDeleteRepository`
 * @abstract
 * @class
 * @extends {DeleteRepository<Primitives<AccessPolicyId>, void>}
 * @description Contrato (interfaz abstracta) para un repositorio que permite eliminar una entidad `AccessPolicy` por su ID.
 * Define el método `deleteById` que debe ser implementado por los adaptadores de infraestructura.
 */
export abstract class AccessPolicyDeleteRepository extends DeleteRepository<
	Primitives<AccessPolicyId>,
	void
> {}
