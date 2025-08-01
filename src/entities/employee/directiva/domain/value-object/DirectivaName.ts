import { StringValueObject } from '@/entities/shared/domain/value-objects/StringValueObjects'

export class DirectivaName extends StringValueObject {
	static readonly NAME_MIN_LENGTH = 3
	static readonly NAME_MAX_LENGTH = 100
	static readonly regex = /^[a-zA-ZÀ-ÿ0-9()\-.,\s]*$/

	private static error = ''

	constructor(value: string) {
		super(value)
		if (!DirectivaName.isValid(value)) {
			throw new Error(DirectivaName.invalidMessage())
		}
	}

	public static isValid(value: string): boolean {
		const errors: string[] = []
		const validFormat = DirectivaName.regex.test(value)
		if (!validFormat) {
			errors.push(
				'La cadena de texto solo puede contener letras mayúsculas, minúsculas, números y los caracteres especiales ()-,.'
			)
		}
		const validLength =
			value.length >= DirectivaName.NAME_MIN_LENGTH &&
			value.length <= DirectivaName.NAME_MAX_LENGTH
		if (!validLength) {
			errors.push(
				`${value} no es un nombre válido. Debe tener entre ${DirectivaName.NAME_MIN_LENGTH} y ${DirectivaName.NAME_MAX_LENGTH} caracteres`
			)
		}
		if (validFormat && validLength) {
			return true
		} else {
			DirectivaName.error = errors.join(' ')
			return false
		}
	}

	public static invalidMessage(): string {
		return DirectivaName.error
	}
}
