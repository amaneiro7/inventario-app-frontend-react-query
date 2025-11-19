import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type PermissionId } from '../value-object/PermissionId'
import { type PermissionName } from '../value-object/PermissionName'
import { type PermissionDescription } from '../value-object/PermissionDescription'
/**
 * @interface Permission
 * @description Representa la entidad de dominio `Permission` con sus propiedades básicas.
 * @property {Primitives<PermissionId>} id - El identificador único del permiso.
 * @property {Primitives<PermissionName>} name - El nombre del permiso.
 * @property {Primitives<PermissionDescription>} description - La descripción del permiso.
 */
export interface Permission {
	id: Primitives<PermissionId>
	name: Primitives<PermissionName>
	description: Primitives<PermissionDescription>
}

/**
 * @typedef {Object} PermissionParams
 * @description Representa los parámetros para crear o actualizar una entidad `Permission`.
 * Incluye todas las propiedades de `PermissionPrimitives` y opcionalmente el `id`.
 * @property {Primitives<PermissionId>} [id] - El identificador único del permiso (opcional para creación).
 * @property {Primitives<PermissionName>} name - El nombre del permiso.
 * @property {Primitives<PermissionDescription>} description - La descripción del permiso.
 */
export type PermissionParams = PermissionPrimitives & {
	id?: Primitives<PermissionId> | undefined
}

/**
 * @typedef {Object} PermissionPrimitives
 * @description Representa la forma primitiva de una entidad `Permission` para la persistencia.
 * Excluye el `id` ya que puede ser generado por el sistema de persistencia.
 * @property {Primitives<PermissionName>} name - El nombre del permiso.
 * @property {Primitives<PermissionDescription>} description - La descripción del permiso.
 */
export type PermissionPrimitives = Omit<Permission, 'id'>

/**
 * @interface PermissionDto
 * @description Representa el Data Transfer Object (DTO) de una entidad `Permission`.
 * Incluye todas las propiedades de `Permission` más la fecha de última actualización.
 * @extends {Permission}
 * @property {string} updatedAt - La fecha y hora de la última actualización del permiso.
 */
export type PermissionDto = Permission & {
	updatedAt: string
}
