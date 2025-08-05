import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type EmployeeType, EmployeeTypes } from './EmployeeType'
import { AcceptedNullValueObject } from '@/entities/shared/domain/value-objects/AcceptedNullValueObject'

/**
 * Represents the employee's code as a Value Object.
 * It extends AcceptedNullValueObject, meaning it can accept a null value under certain conditions.
 *
 * The validation logic ensures:
 * - If the employee type is 'GENERIC', the employee code must be null.
 * - If the employee type is not 'GENERIC', the employee code is mandatory and must be a number.
 */
export class EmployeeCode extends AcceptedNullValueObject<number> {
	private static error = ''

	/**
	 * Constructs an EmployeeCode Value Object.
	 * @param value - The primitive value of the employee code, or null.
	 * @param type - The primitive value of the employee type.
	 * @throws Error if the provided value and type do not meet the validation criteria.
	 */
	constructor(
		value: number | null,
		private readonly type: Primitives<EmployeeType>
	) {
		super(value)
		if (!EmployeeCode.isValid({ value, type: this.type })) {
			throw new Error(EmployeeCode.invalidMessage())
		}
	}

	/**
	 * Validates the given employee code value based on the employee type.
	 * @param params - An object containing the value and type to validate.
	 * @param params.value - The primitive value of the employee code, or null.
	 * @param params.type - The primitive value of the employee type.
	 * @returns True if the value is valid, false otherwise.
	 */
	public static isValid({
		value,
		type
	}: {
		value: Primitives<EmployeeCode> | null | ''
		type: Primitives<EmployeeType>
	}): boolean {
		EmployeeCode.error = '' // Clear the error message

		if (type === EmployeeTypes.GENERIC) {
			if (value) {
				// If it's generic, employee code must be null
				EmployeeCode.error = 'Si es genérico no puede tener un código de empleado.'
				return false
			}
		} else {
			// If it's not generic, employee code is mandatory and must be a number
			if (!value) {
				EmployeeCode.error = 'El código del empleado es obligatorio.'
				return false
			}

			if (typeof value !== 'number') {
				EmployeeCode.error = 'El código del empleado debe ser numérico.'
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
		return EmployeeCode.error
	}
}
