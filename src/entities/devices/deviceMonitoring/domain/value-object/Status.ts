import { EnumValueObject } from '@/entities/shared/domain/value-objects/EnumValueObject'
import { InvalidArgumentError } from '@/entities/shared/domain/value-objects/InvalidArgumentError'

/**
 * @enum {string} DeviceMonitoringStatuses
 * @description Enumeración que define los posibles estados de monitoreo de un dispositivo.
 */
export enum DeviceMonitoringStatuses {
	ONLINE = 'online',
	OFFLINE = 'offline',
	NOTAVAILABLE = 'not available',
	HOSTNAME_MISMATCH = 'hostname mismatch'
}

/**
 * @class DeviceMonitoringStatus
 * @extends {EnumValueObject<DeviceMonitoringStatuses>}
 * @description Value Object que representa el estado de monitoreo de un dispositivo.
 * Asegura que el valor sea uno de los definidos en `DeviceMonitoringStatuses`.
 */
export class DeviceMonitoringStatus extends EnumValueObject<DeviceMonitoringStatuses> {
	/**
	 * Crea una instancia de `DeviceMonitoringStatus`.
	 * @param {DeviceMonitoringStatuses} value - El valor del estado de monitoreo.
	 * @throws {InvalidArgumentError} Si el valor proporcionado no es un estado de monitoreo válido.
	 */	constructor(value: DeviceMonitoringStatuses) {
		super(value, Object.values(DeviceMonitoringStatuses))
	}

	/**
	 * Lanza un error si el valor del estado de monitoreo no es válido.
	 * @protected
	 * @param {DeviceMonitoringStatuses} value - El valor inválido.
	 * @throws {InvalidArgumentError} Siempre lanza este error con un mensaje descriptivo.
	 */	protected throwErrorForInvalidValue(value: DeviceMonitoringStatuses): void {
		throw new InvalidArgumentError(`Invalid status: ${value}`)
	}
}