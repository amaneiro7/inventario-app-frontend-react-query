import { AcceptedNullValueObject } from '@/entities/shared/domain/value-objects/AcceptedNullValueObject'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type EmployeeType, EmployeeTypes } from './EmployeeType'

/**
 * Represents the first name of an employee as a Value Object.
 * It extends AcceptedNullValueObject, meaning it can accept a null value under certain conditions.
 *
 * The validation logic ensures:
 * - If the employee type is not 'GENERIC', the first name is mandatory.
 * - If a value is provided, it must follow a specific format (first letter uppercase, rest lowercase, no trailing spaces unless compound name).
 * - The length of the first name must be within a specified range.
 */
export class EmployeeName extends AcceptedNullValueObject<string> {
	static readonly NAME_MIN_LENGTH = 3
	static readonly NAME_MAX_LENGTH = 100
	static readonly regex = /^[A-ZÑñÁÉÍÓÚ][a-zñáéíóú]*(?: [A-ZÑñÁÉÍÓÚ][a-zñáéíóú]*)*$/

	private static error = ''

	/**
	 * Constructs an EmployeeName Value Object.
	 * @param value - The primitive value of the first name, or null.
	 * @param type - The primitive value of the employee type.
	 * @throws Error if the provided value and type do not meet the validation criteria.
	 */
	constructor(value: string | null, type: Primitives<EmployeeType>) {
		super(value)
		if (value) {
			this.value = value.trim()
		}
		if (!EmployeeName.isValid({ value: this.value, type })) {
			throw new Error(EmployeeName.invalidMessage())
		}
	}

	/**
	 * Validates the given first name value based on the employee type.
	 * @param params - An object containing the value and type to validate.
	 * @param params.value - The primitive value of the first name, or null.
	 * @param params.type - The primitive value of the employee type.
	 * @returns True if the value is valid, false otherwise.
	 */
	public static isValid({
		value,
		type
	}: {
		value: Primitives<EmployeeName>
		type: Primitives<EmployeeType>
	}): boolean {
		EmployeeName.error = '' // Clear the error message

		if (type !== EmployeeTypes.GENERIC) {
			if (value === null) {
				EmployeeName.error = 'El nombre es obligatorio.'
				return false
			}

			const errors: string[] = []

			const validFormat = EmployeeName.regex.test(value)
			if (!validFormat) {
				errors.push(
					'La primera letra debe ser en mayúsculas, el resto en minúsculas, y no puede tener espacios al final al menos que sea un nombre compuesto.'
				)
			}

			const validLength =
				value.length >= EmployeeName.NAME_MIN_LENGTH &&
				value.length <= EmployeeName.NAME_MAX_LENGTH
			if (!validLength) {
				errors.push(
					`El nombre debe tener entre ${EmployeeName.NAME_MIN_LENGTH} y ${EmployeeName.NAME_MAX_LENGTH} caracteres.`
				)
			}

			if (errors.length > 0) {
				EmployeeName.error = errors.join(' ')
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
		return EmployeeName.error
	}
}
