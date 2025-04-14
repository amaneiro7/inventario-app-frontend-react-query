import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type VicepresidenciaEjecutivaId } from '@/core/employee/vicepresidenciaEjecutiva/domain/value-object/VicepresidenciaEjecutivaId'
import { type EmployeeDirectiva } from './EmployeeDirectiva'
import { AcceptedNullValueObject } from '@/core/shared/domain/value-objects/AcceptedNullValueObject'

export class EmployeeVicepresidenciaEjecutiva extends AcceptedNullValueObject<
	Primitives<VicepresidenciaEjecutivaId>
> {
	private static error = ''
	constructor(
		value: Primitives<VicepresidenciaEjecutivaId> | null,
		private readonly directivaId: Primitives<EmployeeDirectiva>
	) {
		super(value)
		if (!EmployeeVicepresidenciaEjecutiva.isValid({ value, directivaId: this.directivaId })) {
			throw new Error(EmployeeVicepresidenciaEjecutiva.invalidMessage())
		}
	}

	public static isValid({
		value,
		directivaId
	}: {
		value?: Primitives<EmployeeVicepresidenciaEjecutiva>
		directivaId?: Primitives<EmployeeDirectiva>
	}): boolean {
		// La directiva es obligatoria si el tipo no es genérico
		// si es generico la directiva es opcional
		EmployeeVicepresidenciaEjecutiva.error = '' // se limpia el error

		if (directivaId === null && value !== null) {
			EmployeeVicepresidenciaEjecutiva.error =
				'Si la directiva jerárquica no ha sido asignada, no se puede asignar una vicepresidencia ejecutiva.'
		}
		return true
	}

	public static invalidMessage(): string {
		return EmployeeVicepresidenciaEjecutiva.error
	}
}
