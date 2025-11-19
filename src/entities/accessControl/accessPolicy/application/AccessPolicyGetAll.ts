import { GetAllBaseService } from '@/entities/shared/domain/methods/getAll.abstract'
import { type AccessPolicyDto } from '../domain/dto/AccessPolicy.dto'

/**
 * `AccessPolicyGetAll`
 * @class
 * @extends {GetAllBaseService<AccessPolicyDto>}
 * @description Servicio de aplicación para obtener todas las entidades `AccessPolicy`.
 * Extiende de `GetAllBaseService` para reutilizar la lógica común de obtención de todos los elementos.
 */
export class AccessPolicyGetAll extends GetAllBaseService<AccessPolicyDto> {}
