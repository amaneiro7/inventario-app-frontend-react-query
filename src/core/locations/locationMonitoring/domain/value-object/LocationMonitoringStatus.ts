import { EnumValueObject } from '@/core/shared/domain/value-objects/EnumValueObject'
import { InvalidArgumentError } from '@/core/shared/domain/value-objects/InvalidArgumentError'

export enum LocationMonitoringStatuses {
	ONLINE = 'online',
	OFFLINE = 'offline',
	NOTAVAILABLE = 'not available'
}

export class LocationMonitoringStatus extends EnumValueObject<LocationMonitoringStatuses> {
	constructor(value: LocationMonitoringStatuses) {
		super(value, Object.values(LocationMonitoringStatuses))
	}

	protected throwErrorForInvalidValue(value: LocationMonitoringStatuses): void {
		throw new InvalidArgumentError(`Invalid status: ${value}`)
	}
}
