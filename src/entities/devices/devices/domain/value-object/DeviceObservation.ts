import { AcceptedNullValueObject } from '@/entities/shared/domain/value-objects/AcceptedNullValueObject'

/**
 * @class DeviceObservation
 * @extends {AcceptedNullValueObject<string>}
 * @description Value Object que representa las observaciones de un dispositivo.
 * Acepta valores nulos.
 */
export class DeviceObservation extends AcceptedNullValueObject<string> {}
