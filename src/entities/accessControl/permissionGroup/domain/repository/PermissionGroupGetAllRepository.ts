import { GetAllRepository } from '@/entities/shared/domain/repository/GetAllRepository.abstract'
import { type PermissionGroupDto } from '../dto/PermissionGroup.dto'

/**
 * `PermissionGroupGetAllRepository`
 * @abstract
 * @class
 * @extends {GetAllRepository<PermissionGroupDto>}
 * @description Contrato (interfaz abstracta) para un repositorio que permite obtener todas las entidades `PermissionGroup`.
 * Define el método `getAll` que debe ser implementado por los adaptadores de infraestructura.
 */
export abstract class PermissionGroupGetAllRepository extends GetAllRepository<PermissionGroupDto> {}
