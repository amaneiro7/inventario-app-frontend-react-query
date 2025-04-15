import { AcceptedNullValueObject } from '@/core/shared/domain/value-objects/AcceptedNullValueObject'
import { InvalidArgumentError } from '@/core/shared/domain/value-objects/InvalidArgumentError'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type EmployeeType, EmployeeTypes } from './EmployeeType'

export class EmployeeCedula extends AcceptedNullValueObject<number> {
	static readonly MAX = 200000000
	static readonly MIN = 1
	private static error = ''

	constructor(value: number | null, private readonly type: Primitives<EmployeeType>) {
		super(value)
		if (!EmployeeCedula.isValid({ value, type: this.type })) {
			throw new InvalidArgumentError(EmployeeCedula.invalidMessage())
		}
	}

	public static isValid({
		value,
		type
	}: {
		value?: Primitives<EmployeeCedula> | ''
		type?: Primitives<EmployeeType>
	}): boolean {
		EmployeeCedula.error = ''
		if (type === EmployeeTypes.GENERIC) {
			if (value) {
				EmployeeCedula.error =
					'La cédula del empleado no es requerida para este tipo de empleado.'
				return false
			}
			return true
		}
		if (!value) {
			EmployeeCedula.error = 'La cédula del empleado es requerida para este tipo de empleado.'
			return false
		}

		if (typeof value !== 'number') {
			EmployeeCedula.error = 'La cédula debe ser numérico.'
			return false
		}
		const validLength = value >= EmployeeCedula.MIN && value <= EmployeeCedula.MAX
		if (!validLength) {
			EmployeeCedula.error = `${value} no es un número de cécula válido. Debe estar entre ${EmployeeCedula.MIN} y ${EmployeeCedula.MAX}`
			return false
		}
		return true
	}

	public static invalidMessage(): string {
		return EmployeeCedula.error
	}
}
