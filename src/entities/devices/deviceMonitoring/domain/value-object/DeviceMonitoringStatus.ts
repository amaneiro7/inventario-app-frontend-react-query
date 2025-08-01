import { EnumValueObject } from '@/entities/shared/domain/value-objects/EnumValueObject'
import { InvalidArgumentError } from '@/entities/shared/domain/value-objects/InvalidArgumentError'

export enum DeviceMonitoringStatuses {
	ONLINE = 'online',
	OFFLINE = 'offline',
	NOTAVAILABLE = 'not available',
	HOSTNAME_MISMATCH = 'hostname mismatch'
}

export class DeviceMonitoringStatus extends EnumValueObject<DeviceMonitoringStatuses> {
	constructor(value: DeviceMonitoringStatuses) {
		super(value, Object.values(DeviceMonitoringStatuses))
	}

	protected throwErrorForInvalidValue(value: DeviceMonitoringStatuses): void {
		throw new InvalidArgumentError(`Invalid status: ${value}`)
	}
}
