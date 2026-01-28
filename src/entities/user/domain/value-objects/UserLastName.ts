import { StringValueObject } from '@/entities/shared/domain/value-objects/StringValueObjects'

/**
 * Represents a user's last name as a Value Object.
 * It extends StringValueObject and enforces specific length and format rules.
 */
export class UserLastName extends StringValueObject {
	static readonly NAME_MIN_LENGTH = 2
	static readonly NAME_MAX_LENGTH = 30

	static readonly Regex = /^[A-ZÑñÁÉÍÓÚ][a-zñáéíóú]*(?: [A-ZÑñÁÉÍÓÚ][a-zñáéíóú]*)*$/

	private static errors = ''

	/**
	 * Constructs a UserLastName Value Object.
	 * @param value - The string value of the user's last name.
	 * @throws Error if the provided value does not meet the validation criteria.
	 */
	constructor(value: string) {
		super(value)
		if (!UserLastName.isValid(value)) {
			throw new Error(UserLastName.invalidMessage())
		}
	}

	/**
	 * Updates the internal error message.
	 * @param value - The error message to set.
	 */
	private static updateErrors(value: string): void {
		UserLastName.errors = value
	}

	/**
	 * Gets the current error message.
	 * @returns The error message string.
	 */
	static get errorsValue(): string {
		return UserLastName.errors
	}

	/**
	 * Validates the given string value against predefined rules for a user's last name.
	 * @param value - The string to validate.
	 * @returns True if the value is valid, false otherwise.
	 */
	public static isValid(value: string): boolean {
		const errors: string[] = []
		if (value.length < UserLastName.NAME_MIN_LENGTH) {
			errors.push(
				`El apellido del usuario debe ser mayor a ${UserLastName.NAME_MIN_LENGTH} caracteres`
			)
		}
		if (value.length > UserLastName.NAME_MAX_LENGTH) {
			errors.push(
				`El apellido del usuario debe ser menor a ${UserLastName.NAME_MAX_LENGTH} caracteres`
			)
		}

		if (!UserLastName.Regex.test(value)) {
			errors.push(
				'La primera letra debe ser en mayúsculas, el resto en minúsculas, y no puede tener espacios al final al menos que sea un nombre compuesto'
			)
		}

		if (errors.length > 0) {
			UserLastName.updateErrors(errors.join(', '))
			UserLastName.invalidMessage()
			return false
		} else {
			return true
		}
	}

	/**
	 * Returns the last validation error message.
	 * @returns The error message string.
	 */
	public static invalidMessage(): string {
		return UserLastName.errorsValue
	}
}
