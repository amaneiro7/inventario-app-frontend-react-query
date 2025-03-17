import { StringValueObject } from '@/core/shared/domain/value-objects/StringValueObjects'

export class CentroTrabajoId extends StringValueObject {
	static readonly NAME_MIN_LENGTH = 1
	static readonly NAME_MAX_LENGTH = 4
	static readonly regex = /^\d+(?:_\d+)?$/

	private static errorMessage = ''

	constructor(value: string) {
		super(value)
		if (!CentroTrabajoId.isValid(value)) {
			throw new Error(CentroTrabajoId.invalidMessage())
		}
	}

	public static isValid(value: string): boolean {
		const validFormat = CentroTrabajoId.regex.test(value)
		const validLength =
			value.length >= CentroTrabajoId.NAME_MIN_LENGTH &&
			value.length <= CentroTrabajoId.NAME_MAX_LENGTH
		if (!validFormat) {
			CentroTrabajoId.errorMessage =
				'El código del centro de Trabajo debe ser numérico y puede contener "_".'
			return false
		}

		if (!validLength) {
			CentroTrabajoId.errorMessage = `${value} no es un nombre válido. Debe tener entre ${CentroTrabajoId.NAME_MIN_LENGTH} y ${CentroTrabajoId.NAME_MAX_LENGTH} caracteres`
			return false
		}

		CentroTrabajoId.errorMessage = ''
		return true
	}

	public static invalidMessage(): string {
		return CentroTrabajoId.errorMessage
	}
}
