import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type EmployeeType, EmployeeTypes } from './EmployeeType'
import { AcceptedNullValueObject } from '@/core/shared/domain/value-objects/AcceptedNullValueObject'

export class EmployeeCode extends AcceptedNullValueObject<number> {
	private static error = ''
	constructor(value: number | null, private readonly type: Primitives<EmployeeType>) {
		super(value)
		if (!EmployeeCode.isValid({ value, type: this.type })) {
			throw new Error(EmployeeCode.invalidMessage())
		}
	}

	public static isValid({
		value,
		type
	}: {
		value?: Primitives<EmployeeCode> | ''
		type?: Primitives<EmployeeType>
	}): boolean {
		// El código del empleado es obligatorio si el tipo no es genérico
		// si es generico no puede tener un código de empleado
		// el código de empleado solo acepta números
		EmployeeCode.error = '' // se limpia el error

		if (type === EmployeeTypes.GENERIC) {
			if (value) {
				EmployeeCode.error = 'Si es genérico no puede tener un código de empleado.'
				return false
			}
			return true
		}

		if (!value) {
			EmployeeCode.error = 'El código del empleado es obligatorio.'
			return false
		}

		if (typeof value !== 'number') {
			EmployeeCode.error = 'El código del empleado debe ser numérico.'
			return false
		}
		return true
	}

	public static invalidMessage(): string {
		return EmployeeCode.error
	}
}
