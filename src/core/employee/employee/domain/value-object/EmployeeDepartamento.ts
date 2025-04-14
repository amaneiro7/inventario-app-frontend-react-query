import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type DepartamentoId } from '@/core/employee/departamento/domain/value-object/DepartamentoId'
import { type EmployeeVicepresidencia } from './EmployeeVicepresidencia'
import { AcceptedNullValueObject } from '@/core/shared/domain/value-objects/AcceptedNullValueObject'

export class EmployeeDepartamento extends AcceptedNullValueObject<Primitives<DepartamentoId>> {
	private static error = ''
	constructor(
		value: Primitives<DepartamentoId> | null,
		private readonly vicepresidenciaId: Primitives<EmployeeVicepresidencia>
	) {
		super(value)
		if (
			!EmployeeDepartamento.isValid({
				value,
				vicepresidenciaId: this.vicepresidenciaId
			})
		) {
			throw new Error(EmployeeDepartamento.invalidMessage())
		}
	}

	public static isValid({
		value,
		vicepresidenciaId
	}: {
		value?: Primitives<EmployeeDepartamento>
		vicepresidenciaId?: Primitives<EmployeeVicepresidencia>
	}): boolean {
		// La directiva es obligatoria si el tipo no es genérico
		// si es generico la directiva es opcional
		EmployeeDepartamento.error = '' // se limpia el error

		if (vicepresidenciaId === null && value !== null) {
			EmployeeDepartamento.error =
				'Si la vicepresidencia no ha sido asignada, no se puede asignar una vicepresidencia.'
		}
		return true
	}

	public static invalidMessage(): string {
		return EmployeeDepartamento.error
	}
}
