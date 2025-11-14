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
	 * Base regular expression for a valid email format.
	 */
	private static readonly emailFormatRegex =
		/^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[a-zA-Z0-9_-]*$/

	private static error = ''

	/**
	 * Constructs an EmployeeEmail Value Object.
	 * @param value - The primitive value of the email address, or null.
	 */
	constructor(value: string | null) {
		super(value)
		// The validation is now expected to be done externally before instantiation,
		// for example, in the entity's factory method, because it needs external data (allowed domains).
	}

	/**
	 * Validates the given email value.
	 * @param params - An object containing the value to validate.
	 * @param params.value - The primitive value of the email address, or null.
	 * @returns True if the value is valid (null or matches the regex), false otherwise.
	 */
	public static isValid({
		value,
		allowedDomains
	}: {
		value: Primitives<EmployeeEmail>
		allowedDomains: string[]
	}): boolean {
		EmployeeEmail.error = '' // Clear the error message

		if (!value) {
			return true // Null is accepted
		}

		if (!EmployeeEmail.emailFormatRegex.test(value)) {
			EmployeeEmail.error = 'No es un formato de correo electrónico válido.'
			return false
		}

		if (allowedDomains.length > 0) {
			const domain = value.substring(value.lastIndexOf('@') + 1)
			if (!allowedDomains.includes(domain)) {
				EmployeeEmail.error = `El dominio del correo no es válido. Dominios permitidos: ${allowedDomains.join(', ')}.`
				return false
			}
		} else {
			EmployeeEmail.error =
				'No se han podido cargar los dominios de correo permitidos para la validación.'
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
