import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type AccessPolicyDto } from '../domain/dto/AccessPolicy.dto'
import { type AccessPolicyId } from '../domain/value-object/AccessPolicyId'
import { GetBaseService } from '@/entities/shared/domain/methods/getter.abstract'

/**
 * `AccessPolicyGetter`
 * @class
 * @extends {GetBaseService<Primitives<AccessPolicyId>, AccessPolicyDto>}
 * @description Servicio de aplicación para obtener una entidad `AccessPolicy` por su ID.
 * Extiende de `GetBaseService` para reutilizar la lógica común de obtención por ID.
 */
export class AccessPolicyGetter extends GetBaseService<
	Primitives<AccessPolicyId>,
	AccessPolicyDto
> {}
