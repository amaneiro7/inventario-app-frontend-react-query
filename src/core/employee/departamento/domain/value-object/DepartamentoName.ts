import { StringValueObject } from '@/core/shared/domain/value-objects/StringValueObjects'

export class DepartamentoName extends StringValueObject {
	static readonly NAME_MIN_LENGTH = 3
	static readonly NAME_MAX_LENGTH = 100
	static readonly regex = /^[a-zA-Z0-9()\-.,\s]*$/

	private static error = ''

	constructor(value: string) {
		super(value)
		if (!DepartamentoName.isValid(value)) {
			throw new Error(DepartamentoName.invalidMessage())
		}
	}

	public static isValid(value: string): boolean {
		const errors: string[] = []
		const validFormat = DepartamentoName.regex.test(value)
		if (!validFormat) {
			errors.push(
				'La cadena de texto solo puede contener letras mayúsculas, minúsculas, números y los caracteres especiales ()-,.'
			)
		}
		const validLength =
			value.length >= DepartamentoName.NAME_MIN_LENGTH &&
			value.length <= DepartamentoName.NAME_MAX_LENGTH
		if (!validLength) {
			errors.push(
				`${value} no es un nombre válido. Debe tener entre ${DepartamentoName.NAME_MIN_LENGTH} y ${DepartamentoName.NAME_MAX_LENGTH} caracteres`
			)
		}
		if (validFormat && validLength) {
			return true
		} else {
			DepartamentoName.error = errors.join(' ')
			return false
		}
	}

	public static invalidMessage(): string {
		return DepartamentoName.error
	}
}
