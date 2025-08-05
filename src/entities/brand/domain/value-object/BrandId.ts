import { Uuid } from '@/entities/shared/domain/value-objects/Uuid'

/**
 * `BrandId`
 * @class
 * @extends {Uuid}
 * @description Value Object que representa el identificador único de una `Brand`.
 * Extiende de `Uuid` para asegurar que el ID sea un UUID válido.
 */
export class BrandId extends Uuid {}