import { EnumValueObject } from '@/entities/shared/domain/value-objects/EnumValueObject'
import { InvalidArgumentError } from '@/entities/shared/domain/value-objects/InvalidArgumentError'

export enum HistoryActionTypes {
	CREATE = 'CREATE',
	UPDATE = 'UPDATE',
	DELETE = 'DELETE'
}

export class HistoryAction extends EnumValueObject<HistoryActionTypes> {
	constructor(value: HistoryActionTypes) {
		super(value, Object.values(HistoryActionTypes))
	}

	protected throwErrorForInvalidValue(value: HistoryActionTypes): void {
		throw new InvalidArgumentError(`Invalid action types: ${value}`)
	}
}
