import { NumberValueObject } from '@/core/shared/domain/value-objects/NumberValueObject'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type EmployeeType, EmployeeTypes } from './EmployeeType'
import { type Nullable } from '@/core/shared/domain/value-objects/Nullable'

export class EmployeeCode extends NumberValueObject {
	private static error = ''
	constructor(value: number, type: Primitives<EmployeeType>) {
		super(value)
		if (!EmployeeCode.isValid({ value, type })) {
			throw new Error(EmployeeCode.invalidMessage())
		}
	}

	public static isValid({
		value,
		type
	}: {
		value?: Nullable<Primitives<EmployeeCode>> | ''
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
