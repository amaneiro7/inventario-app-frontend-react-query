import { StringValueObject } from '@/entities/shared/domain/value-objects/StringValueObjects'

export class EmployeeUserName extends StringValueObject {
	static readonly NAME_MIN_LENGTH = 3
	static readonly NAME_MAX_LENGTH = 100
	static readonly regex = /^[a-zA-Z0-9].*\d*/

	private static error = ''

	constructor(value: string) {
		super(value)
		if (!EmployeeUserName.isValid(value)) {
			throw new Error(EmployeeUserName.invalidMessage())
		}
	}

	public static isValid(value: string): boolean {
		const errors: string[] = []
		const validFormat = EmployeeUserName.regex.test(value)
		if (!validFormat) {
			errors.push(
				'La cadena de texto solo puede contener letras mayúsculas, minúsculas y números'
			)
		}
		const validLength =
			value.length >= EmployeeUserName.NAME_MIN_LENGTH &&
			value.length <= EmployeeUserName.NAME_MAX_LENGTH
		if (!validLength) {
			errors.push(
				`${value} no es un nombre válido. Debe tener entre ${EmployeeUserName.NAME_MIN_LENGTH} y ${EmployeeUserName.NAME_MAX_LENGTH} caracteres`
			)
		}
		if (validFormat && validLength) {
			return true
		} else {
			EmployeeUserName.error = errors.join(' ')
			return false
		}
	}

	public static invalidMessage(): string {
		return EmployeeUserName.error
	}
}
