import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type EmployeeType, EmployeeTypes } from './EmployeeType'
import { AcceptedNullValueObject } from '@/core/shared/domain/value-objects/AcceptedNullValueObject'
import { type DirectivaId } from '@/core/employee/directiva/domain/value-object/DirectivaId'

export class EmployeeDirectiva extends AcceptedNullValueObject<Primitives<DirectivaId>> {
	private static error = ''
	constructor(
		value: Primitives<DirectivaId> | null,
		private readonly type: Primitives<EmployeeType>
	) {
		super(value)
		if (!EmployeeDirectiva.isValid({ value, type: this.type })) {
			throw new Error(EmployeeDirectiva.invalidMessage())
		}
	}

	public static isValid({
		value,
		type
	}: {
		value?: Primitives<EmployeeDirectiva>
		type?: Primitives<EmployeeType>
	}): boolean {
		// La directiva es obligatoria si el tipo no es genérico
		// si es generico la directiva es opcional
		EmployeeDirectiva.error = '' // se limpia el error

		if (type !== EmployeeTypes.GENERIC && !value) {
			EmployeeDirectiva.error = 'La directiva es obligatoria.'
			return false
		}
		return true
	}

	public static invalidMessage(): string {
		return EmployeeDirectiva.error
	}
}
