import { AcceptedNullValueObject } from '@/entities/shared/domain/value-objects/AcceptedNullValueObject'
import { InvalidArgumentError } from '@/entities/shared/domain/value-objects/InvalidArgumentError'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type EmployeeType, EmployeeTypes } from './EmployeeType'

/**
 * Represents the employee's national identification number (cédula) as a Value Object.
 * It extends AcceptedNullValueObject, meaning it can accept a null value under certain conditions.
 *
 * The validation logic ensures:
 * - If the employee type is 'GENERIC', the cédula must be null.
 * - If the employee type is not 'GENERIC', the cédula is mandatory and must be a number within a specified range.
 */
export class EmployeeCedula extends AcceptedNullValueObject<number> {
	static readonly MAX = 200000000
	static readonly MIN = 1
	private static error = ''

	/**
	 * Constructs an EmployeeCedula Value Object.
	 * @param value - The primitive value of the cédula, or null.
	 * @param type - The primitive value of the employee type.
	 * @throws InvalidArgumentError if the provided value and type do not meet the validation criteria.
	 */
	constructor(
		value: number | null,
		private readonly type: Primitives<EmployeeType>
	) {
		super(value)
		if (!EmployeeCedula.isValid({ value, type: this.type })) {
			throw new InvalidArgumentError(EmployeeCedula.invalidMessage())
		}
	}

	/**
	 * Validates the given cédula value based on the employee type.
	 * @param params - An object containing the value and type to validate.
	 * @param params.value - The primitive value of the cédula, or null.
	 * @param params.type - The primitive value of the employee type.
	 * @returns True if the value is valid, false otherwise.
	 */
	public static isValid({
		value,
		type
	}: {
		value: Primitives<EmployeeCedula> | null | ''
		type: Primitives<EmployeeType>
	}): boolean {
		EmployeeCedula.error = '' // Clear the error message

		if (type === EmployeeTypes.GENERIC) {
			if (value) {
				// If it's generic, cédula must be null
				EmployeeCedula.error =
					'La cédula del empleado no es requerida para este tipo de empleado.'
				return false
			}
		} else {
			// If it's not generic, cédula is mandatory and must be a valid number
			if (!value) {
				EmployeeCedula.error =
					'La cédula del empleado es requerida para este tipo de empleado.'
				return false
			}

			if (typeof value !== 'number') {
				EmployeeCedula.error = 'La cédula debe ser numérica.'
				return false
			}

			const validRange = value >= EmployeeCedula.MIN && value <= EmployeeCedula.MAX
			if (!validRange) {
				EmployeeCedula.error = `El número de cédula ${value} no es válido. Debe estar entre ${EmployeeCedula.MIN} y ${EmployeeCedula.MAX}.`
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
		return EmployeeCedula.error
	}
}
