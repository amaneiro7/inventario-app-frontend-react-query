import { InvalidArgumentError } from '@/core/shared/domain/value-objects/InvalidArgumentError'
import { NumberValueObject } from '@/core/shared/domain/value-objects/NumberValueObject'

export class EmployeeCedula extends NumberValueObject {
	static readonly MAX = 200000000
	static readonly MIN = 1
	private static error = ''
	constructor(value: number) {
		super(value)
		if (!EmployeeCedula.isValid(value)) {
			throw new InvalidArgumentError(EmployeeCedula.invalidMessage())
		}
	}

	public static isValid(value: number): boolean {
		const errors: string[] = []
		const validLength = value >= EmployeeCedula.MIN && value <= EmployeeCedula.MAX
		if (!validLength) {
			errors.push(
				`${value} no es un número de cécula válido. Debe estar entre ${EmployeeCedula.MIN} y ${EmployeeCedula.MAX}`
			)
		}

		if (validLength) {
			return true
		} else {
			EmployeeCedula.error = errors.join(' ')
			return false
		}
	}

	public static invalidMessage(): string {
		return EmployeeCedula.error
	}
}
