import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type EmployeeType, EmployeeTypes } from './EmployeeType'
import { AcceptedNullValueObject } from '@/entities/shared/domain/value-objects/AcceptedNullValueObject'
import { type DirectivaId } from '@/entities/employee/directiva/domain/value-object/DirectivaId'

/**
 * Represents the directiva (management/board) of an employee as a Value Object.
 * It extends AcceptedNullValueObject, meaning it can accept a null value under certain conditions.
 *
 * The validation logic ensures:
 * - If the employee type is 'GENERIC', the directiva must be null.
 * - If the employee type is not 'GENERIC', the directiva is mandatory.
 */
export class EmployeeDirectiva extends AcceptedNullValueObject<Primitives<DirectivaId>> {
	private static error = ''

	/**
	 * Constructs an EmployeeDirectiva Value Object.
	 * @param value - The primitive value of the directiva ID, or null.
	 * @param type - The primitive value of the employee type.
	 * @throws Error if the provided value and type do not meet the validation criteria.
	 */
	constructor(
		value: Primitives<DirectivaId> | null,
		private readonly type: Primitives<EmployeeType>
	) {
		super(value)
		if (!EmployeeDirectiva.isValid({ value: this.value, type: this.type })) {
			throw new Error(EmployeeDirectiva.invalidMessage())
		}
	}

	/**
	 * Validates the given directiva value based on the employee type.
	 * @param params - An object containing the value and type to validate.
	 * @param params.value - The primitive value of the directiva ID, or null.
	 * @param params.type - The primitive value of the employee type.
	 * @returns True if the value is valid, false otherwise.
	 */
	public static isValid({
		value,
		type
	}: {
		value: Primitives<DirectivaId> | null
		type: Primitives<EmployeeType>
	}): boolean {
		EmployeeDirectiva.error = '' // Clear the error message

		if (type === EmployeeTypes.GENERIC) {
			if (value !== null) {
				// If it's generic, directiva must be null
				EmployeeDirectiva.error = 'Si es genérico no puede tener una directiva.'
				return false
			}
		} else {
			// If it's not generic, directiva is mandatory
			if (value === null) {
				EmployeeDirectiva.error = 'La directiva es obligatoria.'
				return false
			}
		}
		return true
	}

	/**
	 * Returns the last validation error message.
	 * @returns The error message string.
	 */
	public static invalidMessage(): string {
		return EmployeeDirectiva.error
	}
}
