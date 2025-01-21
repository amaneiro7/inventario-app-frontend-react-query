import { StringValueObject } from '@/core/shared/domain/value-objects/StringValueObjects'

export class EmployeeLastName extends StringValueObject {
	static readonly NAME_MIN_LENGTH = 3
	static readonly NAME_MAX_LENGTH = 100
	static readonly regex =
		/^[A-ZÑñÁÉÍÓÚ][a-zñáéíóú]*(?: [A-ZÑñÁÉÍÓÚ][a-zñáéíóú]*)*$/

	private static error = ''

	constructor(value: string) {
		super(value)
		if (!EmployeeLastName.isValid(value)) {
			throw new Error(EmployeeLastName.invalidMessage())
		}
	}

	public static isValid(value: string): boolean {
		const errors: string[] = []
		const validFormat = EmployeeLastName.regex.test(value)
		if (!validFormat) {
			errors.push(
				'La primera letra debe ser en mayúsculas, el resto en minúsculas, y no puede tener espacios al final al menos que sea un nombre compuesto.'
			)
		}
		const validLength =
			value.length >= EmployeeLastName.NAME_MIN_LENGTH &&
			value.length <= EmployeeLastName.NAME_MAX_LENGTH
		if (!validLength) {
			errors.push(
				`${value} no es un nombre válido. Debe tener entre ${EmployeeLastName.NAME_MIN_LENGTH} y ${EmployeeLastName.NAME_MAX_LENGTH} caracteres`
			)
		}
		if (validFormat && validLength) {
			return true
		} else {
			EmployeeLastName.error = errors.join(' ')
			return false
		}
	}

	public static invalidMessage(): string {
		return EmployeeLastName.error
	}
}
