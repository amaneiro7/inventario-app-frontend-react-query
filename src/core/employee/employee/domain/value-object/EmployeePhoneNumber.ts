import { InvalidArgumentError } from '@/core/shared/domain/value-objects/InvalidArgumentError'
import { StringValueObject } from '@/core/shared/domain/value-objects/StringValueObjects'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'

export enum PhoneNumberAreaCode {
	MOVISTAR1 = '0414',
	MOVISTAR2 = '0424',
	DIGITEL1 = '0412',
	DIGITEL2 = '0422',
	MOVILNET1 = '0416',
	MOVILNET2 = '0426'
}

export class EmployeePhoneNumber extends StringValueObject {
	private static readonly areaCodes = Object.values(PhoneNumberAreaCode)
	private static readonly numberLength = 7
	private static readonly totalLength = 11 // 4 dígitos de área + 7 dígitos del número
	private static readonly phoneRegex = new RegExp(
		`^(${EmployeePhoneNumber.areaCodes.join('|')})\\d{${EmployeePhoneNumber.numberLength}}$`
	)
	private static errorMessage = ''

	constructor(value: string) {
		super(value)

		if (!EmployeePhoneNumber.isValid(value)) {
			throw new InvalidArgumentError(EmployeePhoneNumber.invalidMessage())
		}
	}

	public static fromValues(phones: Primitives<EmployeePhoneNumber>[]): EmployeePhoneNumber[] {
		return phones.filter(Boolean).map(phones => new EmployeePhoneNumber(phones)) ?? []
	}
	public static isValid(value: string): boolean {
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
		EmployeePhoneNumber.errorMessage = ''
		return true
	}

	public static invalidMessage(): string {
		return EmployeePhoneNumber.errorMessage
	}
}
