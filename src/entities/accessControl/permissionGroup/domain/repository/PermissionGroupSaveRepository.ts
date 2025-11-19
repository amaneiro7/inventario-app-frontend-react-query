import { SaveRepository } from '@/entities/shared/domain/repository/SaveRepository'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type PermissionGroupId } from '../value-object/PermissionGroupId'
import { type PermissionGroupPrimitives } from '../dto/PermissionGroup.dto'

/**
 * `PermissionGroupSaveRepository`
 * @abstract
 * @class
 * @extends {SaveRepository<Primitives<PermissionGroupId>, PermissionGroupPrimitives>}
 * @description Contrato (interfaz abstracta) para un repositorio que permite guardar o actualizar entidades `PermissionGroup`.
 * Define los métodos `save` y `update` que deben ser implementados por los adaptadores de infraestructura.
 */
export abstract class PermissionGroupSaveRepository extends SaveRepository<
	Primitives<PermissionGroupId>,
	PermissionGroupPrimitives
> {}
