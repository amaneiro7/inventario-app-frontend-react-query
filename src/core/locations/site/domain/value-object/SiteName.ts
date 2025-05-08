import { StringValueObject } from '@/core/shared/domain/value-objects/StringValueObjects'

export class SiteName extends StringValueObject {
	static readonly NAME_MIN_LENGTH = 3
	static readonly NAME_MAX_LENGTH = 100
	static readonly regex = /^[a-zA-ZÀ-ÿ0-9()\-.,\s]*$/

	private static error = ''

	constructor(value: string) {
		super(value)
		if (!SiteName.isValid(value)) {
			throw new Error(SiteName.invalidMessage())
		}
	}

	public static isValid(value: string): boolean {
		const errors: string[] = []
		const validFormat = SiteName.regex.test(value)
		if (!validFormat) {
			errors.push(
				'El nombre solo puede contener letras mayúsculas, minúsculas, números y los caracteres especiales ()-,.'
			)
		}
		const validLength =
			value.length >= SiteName.NAME_MIN_LENGTH && value.length <= SiteName.NAME_MAX_LENGTH
		if (!validLength) {
			errors.push(
				`${value} no es un nombre válido. Debe tener entre ${SiteName.NAME_MIN_LENGTH} y ${SiteName.NAME_MAX_LENGTH} caracteres`
			)
		}
		if (validFormat && validLength) {
			return true
		} else {
			SiteName.error = errors.join(' ')
			return false
		}
	}

	public static invalidMessage(): string {
		return SiteName.error
	}
}
