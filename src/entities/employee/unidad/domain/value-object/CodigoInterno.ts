import { AcceptedNullValueObject } from '@/entities/shared/domain/value-objects/AcceptedNullValueObject'

export class CodigoInterno extends AcceptedNullValueObject<string> {
	private static readonly VALID_REGEX = /^\d+$/
	private static errors = ''

	constructor(value: string | null) {
		super(value)
		if (!CodigoInterno.isValid({ value })) {
			throw new Error(CodigoInterno.invalidMessage())
		}
	}

	private static updateError(value: string) {
		CodigoInterno.errors = value
	}

	static get errorsValue(): string {
		return CodigoInterno.errors
	}

	public static isValid({ value }: { value: string | null }): boolean {
		if (value === null || value === '') {
			return true
		}
		const errorMesagge: string[] = []
		const isValidCode = this.VALID_REGEX.test(value)
		if (!isValidCode) {
			errorMesagge.push('El código interno debe ser un número válido.')
		}
		this.updateError(errorMesagge.join(' '))
		return isValidCode
	}

	public static invalidMessage(): string {
		return CodigoInterno.errorsValue
	}
}
