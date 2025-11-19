import { GetRepository } from '@/entities/shared/domain/repository/GetterRepository.abstract'
import { type AccessPolicyDto } from '../dto/AccessPolicy.dto'
import { type AccessPolicyId } from '../value-object/AccessPolicyId'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'

/**
 * `AccessPolicyGetRepository`
 * @abstract
 * @class
 * @extends {GetRepository<Primitives<AccessPolicyId>, AccessPolicyDto>}
 * @description Contrato (interfaz abstracta) para un repositorio que permite obtener una entidad `AccessPolicy` por su ID.
 * Define el método `getById` que debe ser implementado por los adaptadores de infraestructura.
 */
export abstract class AccessPolicyGetRepository extends GetRepository<
	Primitives<AccessPolicyId>,
	AccessPolicyDto
> {}
