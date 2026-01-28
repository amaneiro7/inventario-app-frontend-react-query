import { GenericModel } from '@/entities/model/models/domain/value-object/GenericModel'
import { AcceptedNullValueObject } from '@/entities/shared/domain/value-objects/AcceptedNullValueObject'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'

/**
 * @class DeviceSerial
 * @extends {AcceptedNullValueObject<string>}
 * @description Value Object que representa el número de serie de un dispositivo.
 * Incluye validación de formato (mayúsculas, sin caracteres especiales) y longitud,
 * y considera si el modelo es genérico para la obligatoriedad del serial.
 */
export class DeviceSerial extends AcceptedNullValueObject<string> {
	/**
	 * Longitud mínima permitida para el número de serie.
	 * @static
	 * @type {number}
	 */ static readonly NAME_MIN_LENGTH = 5
	/**
	 * Longitud máxima permitida para el número de serie.
	 * @static
	 * @type {number}
	 */ static readonly NAME_MAX_LENGTH = 100
	private static readonly notLowerCase = /^[^a-z]*$/
	private static readonly notSpecialCharacterOnlyGuiones = /^[^\W_]*-?[^\W_]*$/
	private static errors = ''

	/**
	 * Crea una instancia de `DeviceSerial`.
	 * @param {string | null} value - El valor del número de serie.
	 * @param {boolean} [genericModel] - Indica si el modelo asociado es genérico.
	 * @throws {Error} Si el valor no es válido según las reglas de negocio.
	 */ constructor(
		value: string | null,
		readonly genericModel?: boolean
	) {
		super(value)
		if (!DeviceSerial.isValid({ serial: this.value, genericModel: this.genericModel })) {
			throw new Error(DeviceSerial.invalidMessage())
		}
	}

	/**
	 * Actualiza el mensaje de error estático.
	 * @private
	 * @param {string} error - El mensaje de error a establecer.
	 */ private static updateError(error: string): void {
		DeviceSerial.errors = error
	}

	/**
	 * Obtiene el mensaje de error estático.
	 * @private
	 * @type {string}
	 */ private static get errorsValue(): string {
		return DeviceSerial.errors
	}

	/**
	 * Valida el número de serie del dispositivo.
	 * @static
	 * @param {object} props - Propiedades para la validación.
	 * @param {string | null} props.serial - El número de serie a validar.
	 * @param {Primitives<GenericModel>} [props.genericModel] - Indica si el modelo es genérico.
	 * @returns {boolean} `true` si el número de serie es válido, `false` en caso contrario.
	 */ public static isValid({
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

	/**
	 * Obtiene el mensaje de error de validación.
	 * @static
	 * @returns {string} El mensaje de error.
	 */ public static invalidMessage(): string {
		return this.errorsValue
	}
}
