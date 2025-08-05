import { StringValueObject } from '@/entities/shared/domain/value-objects/StringValueObjects'

/**
 * Represents a user's name as a Value Object.
 * It extends StringValueObject and enforces specific length and format rules.
 */
export class UserName extends StringValueObject {
	static readonly NAME_MIN_LENGTH = 3
	static readonly NAME_MAX_LENGTH = 30
	private static readonly Regex = /^[A-ZÑñÁÉÍÓÚ][a-zñáéíóú]*(?: [A-ZÑñÁÉÍÓÚ][a-zñáéíóú]*)*$/
	private static errors = ''

	/**
	 * Constructs a UserName Value Object.
	 * @param value - The string value of the user's name.
	 * @throws Error if the provided value does not meet the validation criteria.
	 */
	constructor(value: string) {
		super(value)
		if (!UserName.isValid(value)) {
			throw new Error(UserName.invalidMessage())
		}
	}

	/**
	 * Updates the internal error message.
	 * @param value - The error message to set.
	 */
	private static updateErrors(value: string): void {
		UserName.errors = value
	}

	/**
	 * Gets the current error message.
	 * @returns The error message string.
	 */
	static get errorsValue(): string {
		return UserName.errors
	}

	/**
	 * Validates the given string value against predefined rules for a user's name.
	 * @param value - The string to validate.
	 * @returns True if the value is valid, false otherwise.
	 */
	public static isValid(value: string): boolean {
		const errorMessage: string[] = []
		if (value.length < UserName.NAME_MIN_LENGTH) {
			errorMessage.push(`El nombre de usuario debe ser mayor a ${UserName.NAME_MIN_LENGTH}`)
		}
		if (value.length > UserName.NAME_MAX_LENGTH) {
			errorMessage.push(`El nombre de usuario debe ser menor a ${UserName.NAME_MAX_LENGTH}`)
		}

		if (!UserName.Regex.test(value)) {
			errorMessage.push(
				`La primera letra debe ser en mayúsculas, el resto en minúsculas, y no puede tener espacios al final al menos que sea un nombre compuesto`
			)
		}
		this.updateErrors(errorMessage.join(' '))
		return (
			errorMessage.length <= 0 // Si el array de errores esta vacio significa que no hay errores y el username es valido
		)
	}

	/**
	 * Returns the last validation error message.
	 * @returns The error message string.
	 */
	public static invalidMessage(): string {
		return UserName.errorsValue
	}
}