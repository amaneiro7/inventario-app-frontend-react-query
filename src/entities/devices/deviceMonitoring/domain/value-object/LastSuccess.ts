import { AcceptedNullValueObject } from '@/entities/shared/domain/value-objects/AcceptedNullValueObject'

/**
 * @class DeviceMonitoringLastSuccess
 * @extends {AcceptedNullValueObject<Date>}
 * @description Value Object que representa la última fecha de éxito de monitoreo de un dispositivo.
 * Acepta valores nulos.
 */
export class DeviceMonitoringLastSuccess extends AcceptedNullValueObject<Date> {}