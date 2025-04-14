import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type VicepresidenciaId } from '@/core/employee/vicepresidencia/domain/value-object/VicepresidenciaId'
import { type EmployeeVicepresidenciaEjecutiva } from './EmployeeVicepresidenciaEjecutiva'
import { AcceptedNullValueObject } from '@/core/shared/domain/value-objects/AcceptedNullValueObject'

export class EmployeeVicepresidencia extends AcceptedNullValueObject<
	Primitives<VicepresidenciaId>
> {
	private static error = ''
	constructor(
		value: Primitives<VicepresidenciaId> | null,
		private readonly vicepresidenciaEjecutivaId: Primitives<EmployeeVicepresidenciaEjecutiva>
	) {
		super(value)
		if (
			!EmployeeVicepresidencia.isValid({
				value,
				vicepresidenciaEjecutivaId: this.vicepresidenciaEjecutivaId
			})
		) {
			throw new Error(EmployeeVicepresidencia.invalidMessage())
		}
	}

	public static isValid({
		value,
		vicepresidenciaEjecutivaId
	}: {
		value?: Primitives<EmployeeVicepresidencia>
		vicepresidenciaEjecutivaId?: Primitives<EmployeeVicepresidenciaEjecutiva>
	}): boolean {
		// La directiva es obligatoria si el tipo no es genérico
		// si es generico la directiva es opcional
		EmployeeVicepresidencia.error = '' // se limpia el error

		if (vicepresidenciaEjecutivaId === null && value !== null) {
			EmployeeVicepresidencia.error =
				'Si la vicepresidencia ejecutiva no ha sido asignada, no se puede asignar una vicepresidencia.'
		}
		return true
	}

	public static invalidMessage(): string {
		return EmployeeVicepresidencia.error
	}
}
