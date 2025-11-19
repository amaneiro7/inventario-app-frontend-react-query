import { GetAllRepository } from '@/entities/shared/domain/repository/GetAllRepository.abstract'
import { type PermissionDto } from '../dto/Permission.dto'

/**
 * `PermissionGetAllRepository`
 * @abstract
 * @class
 * @extends {GetAllRepository<PermissionDto>}
 * @description Contrato (interfaz abstracta) para un repositorio que permite obtener todas las entidades `Permission`.
 * Define el método `getAll` que debe ser implementado por los adaptadores de infraestructura.
 */
export abstract class PermissionGetAllRepository extends GetAllRepository<PermissionDto> {}
