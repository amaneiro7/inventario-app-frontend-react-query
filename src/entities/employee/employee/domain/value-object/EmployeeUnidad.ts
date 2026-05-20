import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type EmployeeType, EmployeeTypes } from './EmployeeType'
import { AcceptedNullValueObject } from '@/entities/shared/domain/value-objects/AcceptedNullValueObject'
import type { UnidadId } from '@/entities/employee/unidad/domain/value-object/UnidadId'

/**
 * Represents the Unidad (management/board) of an employee as a Value Object.
 * It extends AcceptedNullValueObject, meaning it can accept a null value under certain conditions.
 *
 * The validation logic ensures:
 * - If the employee type is 'GENERIC', the Unidad must be null.
 * - If the employee type is not 'GENERIC', the Unidad is mandatory.
 */
export class EmployeeUnidad extends AcceptedNullValueObject<Primitives<UnidadId>> {
	private static error = ''

	/**
	 * Constructs an EmployeeUnidad Value Object.
	 * @param value - The primitive value of the Unidad ID, or null.
	 * @param type - The primitive value of the employee type.
	 * @throws Error if the provided value and type do not meet the validation criteria.
	 */
	constructor(
		value: Primitives<UnidadId> | null,
		private readonly type: Primitives<EmployeeType>
	) {
		super(value)
		if (!EmployeeUnidad.isValid({ value: this.value, type: this.type })) {
			throw new Error(EmployeeUnidad.invalidMessage())
		}
	}

	/**
	 * Validates the given Unidad value based on the employee type.
	 * @param params - An object containing the value and type to validate.
	 * @param params.value - The primitive value of the Unidad ID, or null.
	 * @param params.type - The primitive value of the employee type.
	 * @returns True if the value is valid, false otherwise.
	 */
	public static isValid({
		value,
		type
	}: {
		value: Primitives<UnidadId> | null
		type: Primitives<EmployeeType>
	}): boolean {
		EmployeeUnidad.error = '' // Clear the error message

		const typeRequiredUnidad = [
			EmployeeTypes.REGULAR,
			EmployeeTypes.CONTRACTOR,
			EmployeeTypes.APPRENTICE
		]
		const typesForbiddenUnidad = [EmployeeTypes.GENERIC]

		if (typesForbiddenUnidad.includes(type) && value !== null) {
			// If it's generic, Unidad must be null
			EmployeeUnidad.error = 'Si es genérico no puede tener una Unidad.'
			return false
		}
		if (typeRequiredUnidad.includes(type) && value === null) {
			// If it's not generic, Unidad is mandatory

			EmployeeUnidad.error = 'La Unidad es obligatoria.'
			return false
		}
		return true
	}

	/**
	 * Returns the last validation error message.
	 * @returns The error message string.
	 */
	public static invalidMessage(): string {
		return EmployeeUnidad.error
	}
}
