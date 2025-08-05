import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type DepartamentoId } from '@/entities/employee/departamento/domain/value-object/DepartamentoId'
import { type EmployeeVicepresidencia } from './EmployeeVicepresidencia'
import { AcceptedNullValueObject } from '@/entities/shared/domain/value-objects/AcceptedNullValueObject'

/**
 * Represents the department of an employee as a Value Object.
 * It extends AcceptedNullValueObject, meaning it can accept a null value under certain conditions.
 *
 * The validation logic ensures:
 * - If a vicepresidencia (vice-presidency) is assigned, a department must also be assigned.
 * - If no vicepresidencia is assigned, the department must be null.
 */
export class EmployeeDepartamento extends AcceptedNullValueObject<Primitives<DepartamentoId>> {
	private static error = ''

	/**
	 * Constructs an EmployeeDepartamento Value Object.
	 * @param value - The primitive value of the department ID, or null.
	 * @param vicepresidenciaId - The primitive value of the employee's vicepresidencia ID.
	 * @throws Error if the provided value and vicepresidenciaId do not meet the validation criteria.
	 */
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

	/**
	 * Validates the given department value based on the vicepresidencia ID.
	 * @param params - An object containing the value and vicepresidenciaId to validate.
	 * @param params.value - The primitive value of the department ID, or null.
	 * @param params.vicepresidenciaId - The primitive value of the employee's vicepresidencia ID.
	 * @returns True if the value is valid, false otherwise.
	 */
	public static isValid({
		value,
		vicepresidenciaId
	}: {
		value: Primitives<DepartamentoId> | null
		vicepresidenciaId: Primitives<EmployeeVicepresidencia>
	}): boolean {
		EmployeeDepartamento.error = '' // Clear the error message

		if (vicepresidenciaId === null) {
			if (value !== null) {
				EmployeeDepartamento.error = 'Si la vicepresidencia no ha sido asignada, el departamento debe ser nulo.'
				return false
			}
		} else {
			if (value === null) {
				EmployeeDepartamento.error = 'Si la vicepresidencia ha sido asignada, el departamento es obligatorio.'
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
		return EmployeeDepartamento.error
	}
}
