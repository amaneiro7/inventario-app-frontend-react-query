import { EnumValueObject } from '@/entities/shared/domain/value-objects/EnumValueObject'
import { InvalidArgumentError } from '@/entities/shared/domain/value-objects/InvalidArgumentError'

/**
 * Enumerates the possible types of actions that can be recorded in the history.
 */
export enum HistoryActionTypes {
	CREATE = 'CREATE',
	UPDATE = 'UPDATE',
	DELETE = 'DELETE'
}

/**
 * Represents the action type of a history record as a Value Object.
 * It extends EnumValueObject, ensuring its value is one of the predefined HistoryActionTypes.
 */
export class HistoryAction extends EnumValueObject<HistoryActionTypes> {
	/**
	 * Constructs a HistoryAction Value Object.
	 * @param value - The HistoryActionTypes enum value.
	 * @throws InvalidArgumentError if the provided value is not a valid HistoryActionType.
	 */
	constructor(value: HistoryActionTypes) {
		super(value, Object.values(HistoryActionTypes))
	}

	/**
	 * Throws an InvalidArgumentError if the provided value is not a valid HistoryActionType.
	 * @param value - The invalid HistoryActionTypes value.
	 * @throws InvalidArgumentError
	 */
	protected throwErrorForInvalidValue(value: HistoryActionTypes): void {
		throw new InvalidArgumentError(`Invalid action types: ${value}`)
	}
}