import { Uuid } from '@/entities/shared/domain/value-objects/Uuid'

/**
 * `PermissionId`
 * @class
 * @extends {Uuid}
 * @description Value Object que representa el identificador único de una `Permission`.
 * Extiende de `Uuid` para asegurar que el ID sea un UUID válido.
 */
export class PermissionId extends Uuid {}
