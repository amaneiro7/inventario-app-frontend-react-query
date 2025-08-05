import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type VicepresidenciaId } from '@/entities/employee/vicepresidencia/domain/value-object/VicepresidenciaId'
import { type EmployeeVicepresidenciaEjecutiva } from './EmployeeVicepresidenciaEjecutiva'
import { AcceptedNullValueObject } from '@/entities/shared/domain/value-objects/AcceptedNullValueObject'

/**
 * Represents the vicepresidencia (vice-presidency) of an employee as a Value Object.
 * It extends AcceptedNullValueObject, meaning it can accept a null value under certain conditions.
 *
 * The validation logic ensures:
 * - If a vicepresidencia ejecutiva (executive vice-presidency) is assigned, a vicepresidencia must also be assigned.
 * - If no vicepresidencia ejecutiva is assigned, the vicepresidencia must be null.
 */
export class EmployeeVicepresidencia extends AcceptedNullValueObject<
	Primitives<VicepresidenciaId>
> {
	private static error = ''

	/**
	 * Constructs an EmployeeVicepresidencia Value Object.
	 * @param value - The primitive value of the vicepresidencia ID, or null.
	 * @param vicepresidenciaEjecutivaId - The primitive value of the employee's executive vicepresidencia ID.
	 * @throws Error if the provided value and vicepresidenciaEjecutivaId do not meet the validation criteria.
	 */
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

	/**
	 * Validates the given vicepresidencia value based on the executive vicepresidencia ID.
	 * @param params - An object containing the value and vicepresidenciaEjecutivaId to validate.
	 * @param params.value - The primitive value of the vicepresidencia ID, or null.
	 * @param params.vicepresidenciaEjecutivaId - The primitive value of the employee's executive vicepresidencia ID.
	 * @returns True if the value is valid, false otherwise.
	 */
	public static isValid({
		value,
		vicepresidenciaEjecutivaId
	}: {
		value: Primitives<VicepresidenciaId> | null
		vicepresidenciaEjecutivaId: Primitives<EmployeeVicepresidenciaEjecutiva>
	}): boolean {
		EmployeeVicepresidencia.error = '' // Clear the error message

		if (vicepresidenciaEjecutivaId === null) {
			if (value !== null) {
				EmployeeVicepresidencia.error = 'Si la vicepresidencia ejecutiva no ha sido asignada, la vicepresidencia debe ser nula.'
				return false
			}
		} else {
			if (value === null) {
				EmployeeVicepresidencia.error = 'Si la vicepresidencia ejecutiva ha sido asignada, la vicepresidencia es obligatoria.'
				return false
			}
		}
		return true
	}

	/**
	 * Returns the last validation error message.
	 * @returns The error message string.
	 */
	public static invalidMessage(): string {
		return EmployeeVicepresidencia.error
	}
}