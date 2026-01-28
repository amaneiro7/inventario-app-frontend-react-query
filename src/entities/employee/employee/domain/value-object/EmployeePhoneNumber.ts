import { InvalidArgumentError } from '@/entities/shared/domain/value-objects/InvalidArgumentError'
import { StringValueObject } from '@/entities/shared/domain/value-objects/StringValueObjects'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'

/**
 * Enumerates the accepted Venezuelan phone number area codes.
 */
export enum PhoneNumberAreaCode {
	MOVISTAR1 = '0414',
	MOVISTAR2 = '0424',
	DIGITEL1 = '0412',
	DIGITEL2 = '0422',
	MOVILNET1 = '0416',
	MOVILNET2 = '0426'
}

/**
 * Represents an employee's phone number as a Value Object.
 * It extends StringValueObject and validates the format against Venezuelan area codes and a fixed length.
 */
export class EmployeePhoneNumber extends StringValueObject {
	private static readonly areaCodes = Object.values(PhoneNumberAreaCode)
	private static readonly numberLength = 7
	private static readonly totalLength = 11 // 4 digits for area code + 7 digits for the number
	private static readonly phoneRegex = new RegExp(
		`^(${EmployeePhoneNumber.areaCodes.join('|')})\\d{${EmployeePhoneNumber.numberLength}}$`
	)
	private static errorMessage = ''

	/**
	 * Constructs an EmployeePhoneNumber Value Object.
	 * @param value - The string value of the employee phone number.
	 * @throws InvalidArgumentError if the provided value does not meet the validation criteria.
	 */
	constructor(value: string) {
		super(value)

		if (!EmployeePhoneNumber.isValid({ value })) {
			throw new InvalidArgumentError(EmployeePhoneNumber.invalidMessage())
		}
	}

	/**
	 * Creates an array of EmployeePhoneNumber Value Objects from an array of primitive values.
	 * Filters out any null or undefined values before mapping.
	 * @param phones - An array of primitive phone number values.
	 * @returns An array of EmployeePhoneNumber instances.
	 */
	public static fromValues(phones: Primitives<EmployeePhoneNumber>[]): EmployeePhoneNumber[] {
		return phones.filter(Boolean).map(phone => new EmployeePhoneNumber(phone)) ?? []
	}

	/**
	 * Validates the given phone number value.
	 * @param params - An object containing the value to validate.
	 * @param params.value - The string value of the phone number.
	 * @returns True if the value is valid, false otherwise.
	 */
	public static isValid({ value }: { value: string }): boolean {
		EmployeePhoneNumber.errorMessage = '' // Clear the error message

		if (value.length !== EmployeePhoneNumber.totalLength) {
			EmployeePhoneNumber.errorMessage = `${value} no tiene la longitud correcta. Debe tener ${EmployeePhoneNumber.totalLength} dígitos.`
			return false
		}

		if (!EmployeePhoneNumber.phoneRegex.test(value)) {
			EmployeePhoneNumber.errorMessage = `${value} no es un número de teléfono válido. Debe comenzar con ${EmployeePhoneNumber.areaCodes.join(
				', '
			)} y tener ${EmployeePhoneNumber.numberLength} dígitos adicionales.`
			return false
		}

		return true
	}

	/**
	 * Returns the last validation error message.
	 * @returns The error message string.
	 */
	public static invalidMessage(): string {
		return EmployeePhoneNumber.errorMessage
	}
}
