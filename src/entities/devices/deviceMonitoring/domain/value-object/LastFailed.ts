import { AcceptedNullValueObject } from '@/entities/shared/domain/value-objects/AcceptedNullValueObject'

/**
 * @class DeviceMonitoringLastFailed
 * @extends {AcceptedNullValueObject<Date>}
 * @description Value Object que representa la última fecha de fallo de monitoreo de un dispositivo.
 * Acepta valores nulos.
 */
export class DeviceMonitoringLastFailed extends AcceptedNullValueObject<Date> {}
