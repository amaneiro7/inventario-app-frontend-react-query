import { InvalidArgumentError } from '@/core/shared/domain/value-objects/InvalidArgumentError'
import { StringValueObject } from '@/core/shared/domain/value-objects/StringValueObjects'

enum AreaCode {
	MOVISTAR1 = '0414',
	MOVISTAR2 = '0424',
	DIGITEL = '0412',
	MOVILNET1 = '0416',
	MOVILNET2 = '0426'
}

export class EmployeePhoneNumber extends StringValueObject {
	private static readonly areaCodes = Object.values(AreaCode)
	private static readonly numberLenght = 7
	private static readonly extension = `^(${this.areaCodes.join('|')})\\d{${
		this.numberLenght
	}}$`
	private static readonly phoneRegex = new RegExp(this.extension)
	private static error = ''

	constructor(value: string) {
		super(value)

		if (EmployeePhoneNumber.isValid(value)) {
			throw new InvalidArgumentError(EmployeePhoneNumber.invalidMessage())
		}
	}
	public static isValid(value: string): boolean {
		const errors: string[] = []
		const validFormat = this.phoneRegex.test(value)
		if (!validFormat) {
			errors.push(`${value} no es un número de teléfono válido.`)
		}

		if (validFormat) {
			return true
		} else {
			this.error = errors.join(' ')
			return false
		}
	}

	public static invalidMessage(): string {
		return EmployeePhoneNumber.error
	}
}
