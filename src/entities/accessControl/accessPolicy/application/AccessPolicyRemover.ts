import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type AccessPolicyId } from '../domain/value-object/AccessPolicyId'
import { DeleteBaseService } from '@/entities/shared/domain/methods/remover.abstract'

/**
 * `AccessPolicyRemover`
 * @class
 * @extends {DeleteBaseService<Primitives<AccessPolicyId>, void>}
 * @description Servicio de aplicación para eliminar una entidad `AccessPolicy` por su ID.
 * Extiende de `DeleteBaseService` para reutilizar la lógica común de eliminación por ID.
 */
export class AccessPolicyRemover extends DeleteBaseService<Primitives<AccessPolicyId>, void> {}
