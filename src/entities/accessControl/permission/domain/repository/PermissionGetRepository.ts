import { GetRepository } from '@/entities/shared/domain/repository/GetterRepository.abstract'
import { type PermissionDto } from '../dto/Permission.dto'
import { type PermissionId } from '../value-object/PermissionId'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'

/**
 * `PermissionGetRepository`
 * @abstract
 * @class
 * @extends {GetRepository<Primitives<PermissionId>, PermissionDto>}
 * @description Contrato (interfaz abstracta) para un repositorio que permite obtener una entidad `Permission` por su ID.
 * Define el método `getById` que debe ser implementado por los adaptadores de infraestructura.
 */
export abstract class PermissionGetRepository extends GetRepository<
	Primitives<PermissionId>,
	PermissionDto
> {}
