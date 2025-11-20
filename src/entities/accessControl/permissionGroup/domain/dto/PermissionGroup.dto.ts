import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type PermissionGroupId } from '../value-object/PermissionGroupId'
import { type PermissionGroupName } from '../value-object/PermissionGroupName'
import { type PermissionId } from '@/entities/accessControl/permission/domain/value-object/PermissionId'
import { type PermissionDto } from '@/entities/accessControl/permission/domain/dto/Permission.dto'
import { type PermissionGroupDescription } from '../value-object/PermissionGroupDescription'
/**
 * @interface PermissionGroup
 * @description Representa la entidad de dominio `PermissionGroup` con sus propiedades básicas.
 * @property {Primitives<PermissionGroupId>} id - El identificador único del grupo de permisos.
 * @property {Primitives<PermissionGroupName>} name - El nombre del grupo de permisos.
 * @property {Primitives<PermissionGroupDescription>} description - La descripción del grupo de permisos.
 */
export interface PermissionGroup {
	id: Primitives<PermissionGroupId>
	name: Primitives<PermissionGroupName>
	description: Primitives<PermissionGroupDescription>
}

/**
 * @typedef {Object} PermissionGroupParams
 * @description Representa los parámetros para crear o actualizar una entidad `PermissionGroup`.
 * Incluye todas las propiedades de `PermissionGroupPrimitives` y opcionalmente el `id`.
 * @property {Primitives<PermissionGroupId>} [id] - El identificador único del grupo de permisos (opcional para creación).
 * @property {Primitives<PermissionGroupName>} name - El nombre del grupo de permisos.
 * @property {Primitives<PermissionGroupDescription>} description - La descripción del grupo de permisos.
 * @property {Primitives<PermissionId>[]} permissions - Un array de IDs de permisos asociados.
 */
export type PermissionGroupParams = PermissionGroupPrimitives & {
	id?: Primitives<PermissionGroupId> | undefined
	permissions: Primitives<PermissionId>[]
}

/**
 * @typedef {Object} PermissionGroupPrimitives
 * @description Representa la forma primitiva de una entidad `PermissionGroup` para la persistencia.
 * Excluye el `id` ya que puede ser generado por el sistema de persistencia.
 * @property {Primitives<PermissionGroupName>} name - El nombre del grupo de permisos.
 * @property {Primitives<PermissionGroupDescription>} description - La descripción del grupo de permisos.
 * @property {Primitives<PermissionId>[]} permissions - Un array de IDs de permisos asociados.
 */
export type PermissionGroupPrimitives = Omit<PermissionGroup, 'id'> & {
	permissions: Primitives<PermissionId>[]
}

/**
 * @typedef {Object} PermissionGroupDto
 * @description Representa el Data Transfer Object (DTO) de una entidad `PermissionGroup`.
 * Incluye todas las propiedades de `PermissionGroup` más los permisos completos y la fecha de última actualización.
 * @extends {PermissionGroup}
 * @property {PermissionDto[]} permissions - Un array de objetos `PermissionDto` completos.
 * @property {string} updatedAt - La fecha y hora de la última actualización del grupo de permisos.
 */
export type PermissionGroupDto = PermissionGroup & {
	permissions: PermissionDto[]
	updatedAt: string
}
