import { StringValueObject } from '@/entities/shared/domain/value-objects/StringValueObjects'

export class CentroCostoId extends StringValueObject {
	static readonly NAME_MIN_LENGTH = 1
	static readonly NAME_MAX_LENGTH = 4
	static readonly regex = /^\d+$/

	private static error = ''

	constructor(value: string) {
		super(value)
		if (!CentroCostoId.isValid(value)) {
			throw new Error(CentroCostoId.invalidMessage())
		}
	}

	public static isValid(value: string): boolean {
		const errors: string[] = []
		const validFormat = CentroCostoId.regex.test(value)
		if (!validFormat) {
			errors.push('El código del centro de costo debe ser numérico.')
		}
		const validLength =
			value.length >= CentroCostoId.NAME_MIN_LENGTH &&
			value.length <= CentroCostoId.NAME_MAX_LENGTH
		if (!validLength) {
			errors.push(
				`${value} no es un nombre válido. Debe tener entre ${CentroCostoId.NAME_MIN_LENGTH} y ${CentroCostoId.NAME_MAX_LENGTH} caracteres`
			)
		}
		if (validFormat && validLength) {
			return true
		} else {
			CentroCostoId.error = errors.join(' ')
			return false
		}
	}

	public static invalidMessage(): string {
		return CentroCostoId.error
	}
}
