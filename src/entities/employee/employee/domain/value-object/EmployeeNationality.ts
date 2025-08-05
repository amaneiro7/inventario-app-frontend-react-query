import { AcceptedNullValueObject } from '@/entities/shared/domain/value-objects/AcceptedNullValueObject'
import { InvalidArgumentError } from '@/entities/shared/domain/value-objects/InvalidArgumentError'
import { type EmployeeType, EmployeeTypes } from './EmployeeType'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'

/**
 * Enumerates the accepted nationalities for an employee.
 */
export enum Nationalities {
	V = 'V',
	E = 'E'
}

interface EmployeeNationalityProps {
	value: Nationalities | null
	type: Primitives<EmployeeType>
}

/**
 * Represents the nationality of an employee as a Value Object.
 * It extends AcceptedNullValueObject, meaning it can accept a null value under certain conditions.
 *
 * The validation logic ensures:
 * - If the employee type is not 'GENERIC', the nationality is mandatory.
 * - If a value is provided, it must be one of the predefined Nationalities.
 */
export class EmployeeNationality extends AcceptedNullValueObject<Nationalities> {
	private static error = ''

	/**
	 * Constructs an EmployeeNationality Value Object.
	 * @param value - The primitive value of the nationality, or null.
	 * @param type - The primitive value of the employee type.
	 * @throws Error if the provided value and type do not meet the validation criteria.
	 */
	constructor(
		value: Nationalities | null,
		private readonly type: Primitives<EmployeeType>
	) {
		super(value)
		if (!EmployeeNationality.isValid({ value, type: this.type })) {
			throw new Error(EmployeeNationality.invalidMessage())
		}
	}

	/**
	 * Validates the given nationality value based on the employee type.
	 * @param params - An object containing the value and type to validate.
	 * @param params.value - The primitive value of the nationality, or null.
	 * @param params.type - The primitive value of the employee type.
	 * @returns True if the value is valid, false otherwise.
	 */
	public static isValid({ value, type }: EmployeeNationalityProps): boolean {
		EmployeeNationality.error = '' // Clear the error message

		if (type !== EmployeeTypes.GENERIC) {
			if (value === null) {
				EmployeeNationality.error = 'La nacionalidad es obligatoria.'
				return false
			}
		} else { // If it's generic, nationality must be null
			if (value !== null) {
				EmployeeNationality.error = 'Si es genérico no puede tener una nacionalidad.'
				return false
			}
		}

		if (value !== null && !Object.values(Nationalities).includes(value)) {
			EmployeeNationality.error = `Nacionalidad inválida: ${value}. Las nacionalidades validas son: ${Object.values(
				Nationalities
			).join(', ')}`
			return false
		}

		return true
	}

	/**
	 * Returns the last validation error message.
	 * @returns The error message string.
	 */
	public static invalidMessage(): string {
		return EmployeeNationality.error
	}

	protected throwErrorForInvalidValue(value: Nationalities): void {
		throw new InvalidArgumentError(`Invalid nationality: ${value}`)
	}
}