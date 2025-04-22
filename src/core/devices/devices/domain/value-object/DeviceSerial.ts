import { GenericModel } from '@/core/model/models/domain/value-object/GenericModel'
import { AcceptedNullValueObject } from '@/core/shared/domain/value-objects/AcceptedNullValueObject'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'

export class DeviceSerial extends AcceptedNullValueObject<string> {
	static readonly NAME_MIN_LENGTH = 5
	static readonly NAME_MAX_LENGTH = 100
	static readonly notLowerCase = /^[^a-z]*$/
	static readonly notSpecialCharacterOnlyGuiones = /^[^\W_]*-?[^\W_]*$/
	static errors = ''

	constructor(
		value: string | null,
		readonly genericModel?: boolean
	) {
		super(value)
		if (!DeviceSerial.isValid({ serial: value, genericModel })) {
			throw new Error(DeviceSerial.invalidMessage())
		}
	}

	private static updateError(error: string): void {
		DeviceSerial.errors = error
	}

	private static get errorsValue(): string {
		return DeviceSerial.errors
	}

	public static isValid({
		serial,
		genericModel
	}: {
		serial: string | null
		genericModel?: Primitives<GenericModel>
	}): boolean {
		// condiciones para los casos en que el seriel es null
		if (!serial) {
			// Si el modelo del equipo no es genérico arroja un error
			if (!genericModel) {
				this.updateError('El serial es requerido al menos que sea un modelo genérico')
				return false
			}
			// solo se acepta que el serial sea null cuando el modelo del equipo esta marcado como genérico
			return true
		}
		//if (serial === null || serial === '') return true
		const errorMesagge: string[] = []
		const isHasNotSpecialCharacterOnlyGuiones = this.notSpecialCharacterOnlyGuiones.test(serial)
		if (!isHasNotSpecialCharacterOnlyGuiones) {
			errorMesagge.push(`${serial}: El Serial no puede contener caracteres especiales`)
		}
		const isNotHasLowerCharacter = this.notLowerCase.test(serial)
		if (!isNotHasLowerCharacter) {
			errorMesagge.push('El Serial debe estar en mayúsculas')
		}
		const isNameValidLength =
			serial?.length >= this.NAME_MIN_LENGTH && serial?.length <= this.NAME_MAX_LENGTH
		if (!isNameValidLength) {
			errorMesagge.push(
				`El Serial debe tener entre ${this.NAME_MIN_LENGTH} y ${this.NAME_MAX_LENGTH} caracteres`
			)
		}
		this.updateError(errorMesagge.join(' '))
		return isHasNotSpecialCharacterOnlyGuiones && isNotHasLowerCharacter && isNameValidLength
	}

	public static invalidMessage(): string {
		return this.errorsValue
	}
}
