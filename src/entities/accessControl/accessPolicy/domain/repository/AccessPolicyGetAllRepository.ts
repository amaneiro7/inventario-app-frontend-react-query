import { GetAllRepository } from '@/entities/shared/domain/repository/GetAllRepository.abstract'
import { type AccessPolicyDto } from '../dto/AccessPolicy.dto'

/**
 * `AccessPolicyGetAllRepository`
 * @abstract
 * @class
 * @extends {GetAllRepository<AccessPolicyDto>}
 * @description Contrato (interfaz abstracta) para un repositorio que permite obtener todas las entidades `AccessPolicy`.
 * Define el método `getAll` que debe ser implementado por los adaptadores de infraestructura.
 */
export abstract class AccessPolicyGetAllRepository extends GetAllRepository<AccessPolicyDto> {}
