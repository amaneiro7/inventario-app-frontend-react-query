import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type VicepresidenciaEjecutivaId } from '@/entities/employee/vicepresidenciaEjecutiva/domain/value-object/VicepresidenciaEjecutivaId'
import { type EmployeeDirectiva } from './EmployeeDirectiva'
import { AcceptedNullValueObject } from '@/entities/shared/domain/value-objects/AcceptedNullValueObject'

/**
 * Represents the executive vicepresidencia of an employee as a Value Object.
 * It extends AcceptedNullValueObject, meaning it can accept a null value under certain conditions.
 *
 * The validation logic ensures:
 * - If a directiva (management/board) is assigned, an executive vicepresidencia must also be assigned.
 * - If no directiva is assigned, the executive vicepresidencia must be null.
 */
export class EmployeeVicepresidenciaEjecutiva extends AcceptedNullValueObject<
	Primitives<VicepresidenciaEjecutivaId>
> {
	private static error = ''

	/**
	 * Constructs an EmployeeVicepresidenciaEjecutiva Value Object.
	 * @param value - The primitive value of the executive vicepresidencia ID, or null.
	 * @param directivaId - The primitive value of the employee's directiva ID.
	 * @throws Error if the provided value and directivaId do not meet the validation criteria.
	 */
	constructor(
		value: Primitives<VicepresidenciaEjecutivaId> | null,
		private readonly directivaId: Primitives<EmployeeDirectiva>
	) {
		super(value)
		if (!EmployeeVicepresidenciaEjecutiva.isValid({ value, directivaId: this.directivaId })) {
			throw new Error(EmployeeVicepresidenciaEjecutiva.invalidMessage())
		}
	}

	/**
	 * Validates the given executive vicepresidencia value based on the directiva ID.
	 * @param params - An object containing the value and directivaId to validate.
	 * @param params.value - The primitive value of the executive vicepresidencia ID, or null.
	 * @param params.directivaId - The primitive value of the employee's directiva ID.
	 * @returns True if the value is valid, false otherwise.
	 */
	public static isValid({
		value,
		directivaId
	}: {
		value: Primitives<VicepresidenciaEjecutivaId> | null
		directivaId: Primitives<EmployeeDirectiva>
	}): boolean {
		EmployeeVicepresidenciaEjecutiva.error = '' // Clear the error message

		if (directivaId === null) {
			if (value !== null) {
				EmployeeVicepresidenciaEjecutiva.error = 'Si la directiva jerárquica no ha sido asignada, la vicepresidencia ejecutiva debe ser nula.'
				return false
			}
		} else {
			if (value === null) {
				EmployeeVicepresidenciaEjecutiva.error = 'Si la directiva jerárquica ha sido asignada, la vicepresidencia ejecutiva es obligatoria.'
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
		return EmployeeVicepresidenciaEjecutiva.error
	}
}