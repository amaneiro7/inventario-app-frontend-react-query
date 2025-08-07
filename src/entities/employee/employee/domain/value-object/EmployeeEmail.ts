import { AcceptedNullValueObject } from '@/entities/shared/domain/value-objects/AcceptedNullValueObject'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'

/**
 * Represents the employee's email address as a Value Object.
 * It extends AcceptedNullValueObject, meaning it can accept a null value.
 *
 * The validation logic ensures:
 * - If a value is provided, it must match a specific email format (e.g., ending with @bnc.com.ve).
 * - A null value is considered valid.
 */
export class EmployeeEmail extends AcceptedNullValueObject<string> {
	/**
	 * Regular expression for validating employee email addresses.
	 * It specifically checks for emails ending with '@bnc.com.ve'.
	 */
	static readonly regex =
		/^(?=.*[@](?:bnc\.com\.ve)$)[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[a-zA-Z0-9_-]*$/

	private static error = ''

	/**
	 * Constructs an EmployeeEmail Value Object.
	 * @param value - The primitive value of the email address, or null.
	 * @throws Error if the provided value does not meet the validation criteria (and is not null).
	 */
	constructor(value: string | null) {
		super(value)
		if (!EmployeeEmail.isValid({ value: this.value })) {
			throw new Error(EmployeeEmail.invalidMessage())
		}
	}

	/**
	 * Validates the given email value.
	 * @param params - An object containing the value to validate.
	 * @param params.value - The primitive value of the email address, or null.
	 * @returns True if the value is valid (null or matches the regex), false otherwise.
	 */
	public static isValid({ value }: { value: Primitives<EmployeeEmail> }): boolean {
		EmployeeEmail.error = '' // Clear the error message

		if (!value) {
			return true // Null is accepted
		}

		if (!EmployeeEmail.regex.test(value)) {
			EmployeeEmail.error =
				'No es un formato de correo electrónico válido o no pertenece al dominio bnc.com.ve.'
			return false
		}
		return true
	}

	/**
	 * Returns the last validation error message.
	 * @returns The error message string.
	 */
	public static invalidMessage(): string {
		return EmployeeEmail.error
	}
}
