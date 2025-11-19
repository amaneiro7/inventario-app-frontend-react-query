import { SaveRepository } from '@/entities/shared/domain/repository/SaveRepository'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type AccessPolicyId } from '../value-object/AccessPolicyId'
import { type AccessPolicyPrimitives } from '../dto/AccessPolicy.dto'

/**
 * `AccessPolicySaveRepository`
 * @abstract
 * @class
 * @extends {SaveRepository<Primitives<AccessPolicyId>, AccessPolicyPrimitives>}
 * @description Contrato (interfaz abstracta) para un repositorio que permite guardar o actualizar entidades `AccessPolicy`.
 * Define los métodos `save` y `update` que deben ser implementados por los adaptadores de infraestructura.
 */
export abstract class AccessPolicySaveRepository extends SaveRepository<
	Primitives<AccessPolicyId>,
	AccessPolicyPrimitives
> {}
