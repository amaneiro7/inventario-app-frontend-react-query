import { StringValueObject } from '@/entities/shared/domain/value-objects/StringValueObjects'

/**
 * Represents the name of a VicepresidenciaEjecutiva as a Value Object.
 * It extends StringValueObject and enforces specific length and format rules.
 */
export class VicepresidenciaEjecutivaName extends StringValueObject {
	static readonly NAME_MIN_LENGTH = 3
	static readonly NAME_MAX_LENGTH = 100
	static readonly regex = /^[a-zA-ZÀ-ÿ0-9()\-.,\s]*$/

	private static error = ''

	/**
	 * Constructs a VicepresidenciaEjecutivaName Value Object.
	 * @param value - The string value of the vicepresidencia ejecutiva name.
	 * @throws Error if the provided value does not meet the validation criteria.
	 */
	constructor(value: string) {
		super(value)
		if (!VicepresidenciaEjecutivaName.isValid(value)) {
			throw new Error(VicepresidenciaEjecutivaName.invalidMessage())
		}
	}

	/**
	 * Validates the given string value against predefined rules for a vicepresidencia ejecutiva name.
	 * @param value - The string to validate.
	 * @returns True if the value is valid, false otherwise.
	 */
	public static isValid(value: string): boolean {
		const errors: string[] = []
		const validFormat = VicepresidenciaEjecutivaName.regex.test(value)
		if (!validFormat) {
			errors.push(
				'La cadena de texto solo puede contener letras mayúsculas, minúsculas, números y los caracteres especiales ()-,.'
			)
		}
		const validLength =
			value.length >= VicepresidenciaEjecutivaName.NAME_MIN_LENGTH &&
			value.length <= VicepresidenciaEjecutivaName.NAME_MAX_LENGTH
		if (!validLength) {
			errors.push(
				`${value} no es un nombre válido. Debe tener entre ${VicepresidenciaEjecutivaName.NAME_MIN_LENGTH} y ${VicepresidenciaEjecutivaName.NAME_MAX_LENGTH} caracteres`
			)
		}
		if (validFormat && validLength) {
			return true
		} else {
			VicepresidenciaEjecutivaName.error = errors.join(' ')
			return false
		}
	}

	/**
	 * Returns the last validation error message.
	 * @returns The error message string.
	 */
	public static invalidMessage(): string {
		return VicepresidenciaEjecutivaName.error
	}
}