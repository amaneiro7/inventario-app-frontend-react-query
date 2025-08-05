import { InvalidArgumentError } from '@/entities/shared/domain/value-objects/InvalidArgumentError'
import { StringValueObject } from '@/entities/shared/domain/value-objects/StringValueObjects'
import { codigosAreaVenezuela } from './codigosAreaVenezuela'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'

/**
 * Represents an employee's phone extension as a Value Object.
 * It extends StringValueObject and validates the format against Venezuelan area codes and a fixed length.
 */
export class EmployeeExtension extends StringValueObject {
	private static readonly areaCodes = codigosAreaVenezuela.map(areaCode => areaCode.codigo)
	private static readonly numberLength = 7
	private static readonly extensionRegex = new RegExp(`^(${this.areaCodes.join('|')})\\d{${this.numberLength}}$`)
	private static error = ''

	/**
	 * Constructs an EmployeeExtension Value Object.
	 * @param value - The string value of the employee extension.
	 * @throws InvalidArgumentError if the provided value does not meet the validation criteria.
	 */
	constructor(value: string) {
		super(value)

		if (!EmployeeExtension.isValid({ value })) {
			throw new InvalidArgumentError(EmployeeExtension.invalidMessage())
		}
	}

	/**
	 * Creates an array of EmployeeExtension Value Objects from an array of primitive values.
	 * Filters out any null or undefined values before mapping.
	 * @param extensions - An array of primitive extension values.
	 * @returns An array of EmployeeExtension instances.
	 */
	public static fromValues(extensions: Primitives<EmployeeExtension>[]): EmployeeExtension[] {
		return extensions.filter(Boolean).map(extension => new EmployeeExtension(extension)) ?? []
	}

	/**
	 * Validates the given extension value.
	 * @param params - An object containing the value to validate.
	 * @param params.value - The string value of the extension.
	 * @returns True if the value is valid, false otherwise.
	 */
	public static isValid({ value }: { value: string }): boolean {
		EmployeeExtension.error = '' // Clear the error message

		const validFormat = EmployeeExtension.extensionRegex.test(value)
		if (!validFormat) {
			EmployeeExtension.error = `${value} no es un número de extensión válido. Debe seguir el formato de código de área venezolano seguido de 7 dígitos.`
			return false
		}

		return true
	}

	/**
	 * Returns the last validation error message.
	 * @returns The error message string.
	 */
	public static invalidMessage(): string {
		return EmployeeExtension.error
	}
}