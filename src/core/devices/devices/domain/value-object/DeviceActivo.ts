import { AcceptedNullValueObject } from '@/core/shared/domain/value-objects/AcceptedNullValueObject'

export class DeviceActivo extends AcceptedNullValueObject<string> {
	private static readonly NAME_MIN_LENGTH = 5
	private static readonly NAME_MAX_LENGTH = 100
	private static readonly notLowerCase = /^[^a-z]*$/
	private static readonly notSpecialCharacterOnlyGuiones = /^[^\W_]*-?[^\W_]*$/
	private static errors = ''
	constructor(value: string | null) {
		super(value)
		if (!DeviceActivo.isValid({ value })) {
			throw new Error(DeviceActivo.invalidMessage())
		}
	}

	private static updateError(value: string) {
		DeviceActivo.errors = value
	}

	static get errorsValue(): string {
		return DeviceActivo.errors
	}

	public static isValid({ value }: { value: string | null }): boolean {
		if (value === null || value === '') return true
		const errorMesagge: string[] = []
		const isHasNotSpecialCharacterOnlyGuiones = this.notSpecialCharacterOnlyGuiones.test(value)
		if (!isHasNotSpecialCharacterOnlyGuiones) {
			errorMesagge.push(`${value}: El activo no puede contener caracteres especiales`)
		}
		const isNotHasLowerCharacter = this.notLowerCase.test(value)
		if (!isNotHasLowerCharacter) {
			errorMesagge.push('El activo debe estar en mayúsculas')
		}
		const isNameValidLength =
			value.length >= this.NAME_MIN_LENGTH && value.length <= this.NAME_MAX_LENGTH
		if (!isNameValidLength) {
			errorMesagge.push(
				`El activo debe tener entre ${this.NAME_MIN_LENGTH} y ${this.NAME_MAX_LENGTH} caracteres`
			)
		}
		this.updateError(errorMesagge.join(' '))
		return isHasNotSpecialCharacterOnlyGuiones && isNotHasLowerCharacter && isNameValidLength
	}

	public static invalidMessage(): string {
		return DeviceActivo.errorsValue
	}
}
