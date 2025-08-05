import { AcceptedNullValueObject } from '@/entities/shared/domain/value-objects/AcceptedNullValueObject'

/**
 * @class DeviceActivo
 * @extends {AcceptedNullValueObject<string>}
 * @description Value Object que representa el número de activo de un dispositivo.
 * Incluye validación de formato (mayúsculas, sin caracteres especiales) y longitud.
 */
export class DeviceActivo extends AcceptedNullValueObject<string> {
	/**
	 * Longitud mínima permitida para el número de activo.
	 * @static
	 * @type {number}
	 */ private static readonly NAME_MIN_LENGTH = 5
	/**
	 * Longitud máxima permitida para el número de activo.
	 * @static
	 * @type {number}
	 */ private static readonly NAME_MAX_LENGTH = 100
	private static readonly notLowerCase = /^[^a-z]*$/
	private static readonly notSpecialCharacterOnlyGuiones = /^[^\W_]*-?[^\W_]*$/

	private static errors = ''

	/**
	 * Crea una instancia de `DeviceActivo`.
	 * @param {string | null} value - El valor del número de activo.
	 * @throws {Error} Si el valor no es válido según las reglas definidas.
	 */ constructor(value: string | null) {
		super(value)
		if (!DeviceActivo.isValid({ value })) {
			throw new Error(DeviceActivo.invalidMessage())
		}
	}

	/**
	 * Actualiza el mensaje de error estático.
	 * @private
	 * @param {string} value - El mensaje de error a establecer.
	 */ private static updateError(value: string) {
		DeviceActivo.errors = value
	}

	/**
	 * Obtiene el mensaje de error estático.
	 * @static
	 * @type {string}
	 */ static get errorsValue(): string {
		return DeviceActivo.errors
	}

	/**
	 * Valida el número de activo.
	 * @static
	 * @param {object} props - Propiedades para la validación.
	 * @param {string | null} props.value - El valor del número de activo a validar.
	 * @returns {boolean} `true` si el número de activo es válido, `false` en caso contrario.
	 */ public static isValid({ value }: { value: string | null }): boolean {
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

	/**
	 * Obtiene el mensaje de error de validación.
	 * @static
	 * @returns {string} El mensaje de error.
	 */ public static invalidMessage(): string {
		return DeviceActivo.errorsValue
	}
}
