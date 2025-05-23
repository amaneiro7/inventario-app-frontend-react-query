import { StringValueObject } from '@/core/shared/domain/value-objects/StringValueObjects'

export class VicepresidenciaName extends StringValueObject {
	static readonly NAME_MIN_LENGTH = 3
	static readonly NAME_MAX_LENGTH = 100
	static readonly regex = /^[a-zA-ZÀ-ÿ0-9()\-.,\s]*$/

	private static error = ''

	constructor(value: string) {
		super(value)
		if (!VicepresidenciaName.isValid(value)) {
			throw new Error(VicepresidenciaName.invalidMessage())
		}
	}

	public static isValid(value: string): boolean {
		const errors: string[] = []
		const validFormat = VicepresidenciaName.regex.test(value)
		if (!validFormat) {
			errors.push(
				'La cadena de texto solo puede contener letras mayúsculas, minúsculas, números y los caracteres especiales ()-,.'
			)
		}
		const validLength =
			value.length >= VicepresidenciaName.NAME_MIN_LENGTH &&
			value.length <= VicepresidenciaName.NAME_MAX_LENGTH
		if (!validLength) {
			errors.push(
				`${value} no es un nombre válido. Debe tener entre ${VicepresidenciaName.NAME_MIN_LENGTH} y ${VicepresidenciaName.NAME_MAX_LENGTH} caracteres`
			)
		}
		if (validFormat && validLength) {
			return true
		} else {
			VicepresidenciaName.error = errors.join(' ')
			return false
		}
	}

	public static invalidMessage(): string {
		return VicepresidenciaName.error
	}
}
