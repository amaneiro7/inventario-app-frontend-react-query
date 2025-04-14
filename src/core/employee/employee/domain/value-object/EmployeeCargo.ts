import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type EmployeeType, EmployeeTypes } from './EmployeeType'
import { type CargoId } from '@/core/employee/cargo/domain/value-object/CargoId'
import { AcceptedNullValueObject } from '@/core/shared/domain/value-objects/AcceptedNullValueObject'

export class EmployeeCargo extends AcceptedNullValueObject<Primitives<CargoId>> {
	private static error = ''
	constructor(
		value: Primitives<CargoId> | null,
		private readonly type: Primitives<EmployeeType>
	) {
		super(value)
		if (!EmployeeCargo.isValid({ value, type: this.type })) {
			throw new Error(EmployeeCargo.invalidMessage())
		}
	}

	public static isValid({
		value,
		type
	}: {
		value?: Primitives<EmployeeCargo>
		type?: Primitives<EmployeeType>
	}): boolean {
		// El código del empleado es obligatorio si el tipo no es genérico
		// si es generico no puede tener un código de empleado
		// el código de empleado solo acepta números
		EmployeeCargo.error = '' // se limpia el error

		if (type === EmployeeTypes.GENERIC) {
			if (value) {
				EmployeeCargo.error = 'Si es genérico no puede tener un cargo.'
				return false
			}
			return true
		}

		if (!value) {
			EmployeeCargo.error = 'El cargo es obligatorio.'
			return false
		}
		return true
	}

	public static invalidMessage(): string {
		return EmployeeCargo.error
	}
}
