import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type EmployeeType, EmployeeTypes } from './EmployeeType'
import { type CargoId } from '@/entities/employee/cargo/domain/value-object/CargoId'
import { AcceptedNullValueObject } from '@/entities/shared/domain/value-objects/AcceptedNullValueObject'

/**
 * Represents the cargo (position) of an employee as a Value Object.
 * It extends AcceptedNullValueObject, meaning it can accept a null value under certain conditions.
 *
 * The validation logic ensures:
 * - If the employee type is 'GENERIC', the cargo must be null.
 * - If the employee type is not 'GENERIC', the cargo is mandatory.
 */
export class EmployeeCargo extends AcceptedNullValueObject<Primitives<CargoId>> {
	private static error = ''

	/**
	 * Constructs an EmployeeCargo Value Object.
	 * @param value - The primitive value of the cargo ID, or null.
	 * @param type - The primitive value of the employee type.
	 * @throws Error if the provided value and type do not meet the validation criteria.
	 */
	constructor(
		value: Primitives<CargoId> | null,
		private readonly type: Primitives<EmployeeType>
	) {
		super(value)
		if (!EmployeeCargo.isValid({ value: this.value, type: this.type })) {
			throw new Error(EmployeeCargo.invalidMessage())
		}
	}

	/**
	 * Validates the given cargo value based on the employee type.
	 * @param params - An object containing the value and type to validate.
	 * @param params.value - The primitive value of the cargo ID, or null.
	 * @param params.type - The primitive value of the employee type.
	 * @returns True if the value is valid, false otherwise.
	 */
	public static isValid({
		value,
		type
	}: {
		value: Primitives<CargoId> | null
		type: Primitives<EmployeeType>
	}): boolean {
		EmployeeCargo.error = '' // Clear the error message

		if (type === EmployeeTypes.GENERIC) {
			if (value !== null) {
				// If it's generic, cargo must be null
				EmployeeCargo.error = 'Si es genérico no puede tener un cargo.'
				return false
			}
		} else {
			// If it's not generic, cargo is mandatory
			if (value === null) {
				EmployeeCargo.error = 'El cargo es obligatorio.'
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
		return EmployeeCargo.error
	}
}
