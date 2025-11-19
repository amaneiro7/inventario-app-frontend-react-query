import { SaveRepository } from '@/entities/shared/domain/repository/SaveRepository'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type PermissionId } from '../value-object/PermissionId'
import { type PermissionPrimitives } from '../dto/Permission.dto'

/**
 * `PermissionSaveRepository`
 * @abstract
 * @class
 * @extends {SaveRepository<Primitives<PermissionId>, PermissionPrimitives>}
 * @description Contrato (interfaz abstracta) para un repositorio que permite guardar o actualizar entidades `Permission`.
 * Define los métodos `save` y `update` que deben ser implementados por los adaptadores de infraestructura.
 */
export abstract class PermissionSaveRepository extends SaveRepository<
	Primitives<PermissionId>,
	PermissionPrimitives
> {}
