import { EnumValueObject } from '@/entities/shared/domain/value-objects/EnumValueObject'
import { InvalidArgumentError } from '@/entities/shared/domain/value-objects/InvalidArgumentError'

/**
 * Enumerates the possible types of employees.
 */
export enum EmployeeTypes {
	GENERIC = 'generic', // Cuentas compartidas (ej. Recepción)
	SERVICE = 'service', // Empleado con acceso a la app
	REGULAR = 'regular', // Empleado fijo/permanente sin acceso
	CONTRACTOR = 'contractor', // Contratado (por proyecto/tiempo determinado)
	APPRENTICE = 'apprentice' // Aprendiz / Pasante / SENA
}

/**
 * Represents the type of an employee as a Value Object.
 * It extends EnumValueObject, ensuring its value is one of the predefined EmployeeTypes.
 */
export class EmployeeType extends EnumValueObject<EmployeeTypes> {
	/**
	 * Constructs an EmployeeType Value Object.
	 * @param value - The EmployeeTypes enum value.
	 * @throws InvalidArgumentError if the provided value is not a valid EmployeeType.
	 */
	constructor(value: EmployeeTypes) {
		super(value, Object.values(EmployeeTypes))
	}

	/**
	 * Throws an InvalidArgumentError if the provided value is not a valid EmployeeType.
	 * @param value - The invalid EmployeeTypes value.
	 * @throws InvalidArgumentError
	 */
	protected throwErrorForInvalidValue(value: EmployeeTypes): void {
		throw new InvalidArgumentError(`Invalid employee type: ${value}`)
	}
}
