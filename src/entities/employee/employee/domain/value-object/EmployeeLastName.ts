import { AcceptedNullValueObject } from '@/entities/shared/domain/value-objects/AcceptedNullValueObject'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type EmployeeType, EmployeeTypes } from './EmployeeType'

/**
 * Represents the last name of an employee as a Value Object.
 * It extends AcceptedNullValueObject, meaning it can accept a null value under certain conditions.
 *
 * The validation logic ensures:
 * - If the employee type is not 'GENERIC', the last name is mandatory.
 * - If a value is provided, it must follow a specific format (first letter uppercase, rest lowercase, no trailing spaces unless compound name).
 * - The length of the last name must be within a specified range.
 */
export class EmployeeLastName extends AcceptedNullValueObject<string> {
	static readonly NAME_MIN_LENGTH = 3
	static readonly NAME_MAX_LENGTH = 100
	static readonly regex = /^[A-ZÑñÁÉÍÓÚ][a-zñáéíóú]*(?: [A-ZÑñÁÉÍÓÚ][a-zñáéíóú]*)*$/

	private static error = ''

	/**
	 * Constructs an EmployeeLastName Value Object.
	 * @param value - The primitive value of the last name, or null.
	 * @param type - The primitive value of the employee type.
	 * @throws Error if the provided value and type do not meet the validation criteria.
	 */
	constructor(value: string | null, type: Primitives<EmployeeType>) {
		super(value)
		if (!EmployeeLastName.isValid({ value, type })) {
			throw new Error(EmployeeLastName.invalidMessage())
		}
	}

	/**
	 * Validates the given last name value based on the employee type.
	 * @param params - An object containing the value and type to validate.
	 * @param params.value - The primitive value of the last name, or null.
	 * @param params.type - The primitive value of the employee type.
	 * @returns True if the value is valid, false otherwise.
	 */
	public static isValid({
		value,
		type
	}: {
		value: Primitives<EmployeeLastName> | null
		type: Primitives<EmployeeType>
	}): boolean {
		EmployeeLastName.error = '' // Clear the error message

		if (type !== EmployeeTypes.GENERIC) {
			if (value === null) {
				EmployeeLastName.error = 'El apellido es obligatorio.'
				return false
			}

			const errors: string[] = []

			const validFormat = EmployeeLastName.regex.test(value)
			if (!validFormat) {
				errors.push(
					'La primera letra debe ser en mayúsculas, el resto en minúsculas, y no puede tener espacios al final al menos que sea un nombre compuesto.'
				)
			}

			const validLength =
				value.length >= EmployeeLastName.NAME_MIN_LENGTH &&
				value.length <= EmployeeLastName.NAME_MAX_LENGTH
			if (!validLength) {
				errors.push(
					`El nombre debe tener entre ${EmployeeLastName.NAME_MIN_LENGTH} y ${EmployeeLastName.NAME_MAX_LENGTH} caracteres.`
				)
			}

			if (errors.length > 0) {
				EmployeeLastName.error = errors.join(' ')
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
		return EmployeeLastName.error
	}
}
