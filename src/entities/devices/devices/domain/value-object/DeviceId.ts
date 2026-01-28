import { Uuid } from '@/entities/shared/domain/value-objects/Uuid'

/**
 * @class DeviceId
 * @extends {Uuid}
 * @description Value Object que representa el identificador único de un `Device`.
 * Extiende de `Uuid` para asegurar que el ID sea un UUID válido.
 */
export class DeviceId extends Uuid {}
