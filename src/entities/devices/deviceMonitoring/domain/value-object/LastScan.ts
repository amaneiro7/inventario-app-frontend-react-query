import { AcceptedNullValueObject } from '@/entities/shared/domain/value-objects/AcceptedNullValueObject'

/**
 * @class DeviceMonitoringLastScan
 * @extends {AcceptedNullValueObject<Date>}
 * @description Value Object que representa la última fecha de escaneo de monitoreo de un dispositivo.
 * Acepta valores nulos.
 */
export class DeviceMonitoringLastScan extends AcceptedNullValueObject<Date> {}