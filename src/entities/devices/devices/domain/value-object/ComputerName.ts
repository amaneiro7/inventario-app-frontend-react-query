import { AcceptedNullValueObject } from '@/entities/shared/domain/value-objects/AcceptedNullValueObject'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type StatusId } from '@/entities/status/status/domain/value-object/StatusId'
import { StatusOptions } from '@/entities/status/status/domain/entity/StatusOptions'

/**
 * @class ComputerName
 * @extends {AcceptedNullValueObject<string>}
 * @description Value Object que representa el nombre de un equipo de cómputo.
 * Incluye validación de formato (mayúsculas, sin caracteres especiales) y reglas de negocio basadas en el estado del dispositivo.
 */
export class ComputerName extends AcceptedNullValueObject<string> {
	/**
	 * Longitud mínima permitida para el nombre del equipo.
	 * @static
	 * @type {number}
	 */	static readonly NAME_MIN_LENGTH = 5
	/**
	 * Longitud máxima permitida para el nombre del equipo.
	 * @static
	 * @type {number}
	 */	static readonly NAME_MAX_LENGTH = 100
	private static errors = ''
	private static readonly notLowerCase = /^[^a-z]*$/
	private static readonly notSpecialCharacterOnlyGuiones = /^[^\]*-[^\W_]*$/

	/**
	 * Crea una instancia de `ComputerName`.
	 * @param {string | null} value - El valor del nombre del equipo.
	 * @param {Primitives<StatusId>} status - El ID del estado del dispositivo asociado.
	 * @throws {Error} Si el valor no es válido según las reglas de negocio.
	 */	constructor(
		value: string | null,
		readonly status: Primitives<StatusId>
	) {
		super(value)

		if (!ComputerName.isValid({ value: this.value, status: this.status })) {
			throw new Error(ComputerName.invalidMessage())
		}
	}

	/**
	 * Actualiza el mensaje de error estático.
	 * @private
	 * @param {string} error - El mensaje de error a establecer.
	 */	private static updateError(error: string): void {
		this.errors = error
	}

	/**
	 * Obtiene el mensaje de error estático.
	 * @private
	 * @type {string}
	 */	private static get errorsValue(): string {
		return this.errors
	}

	/**
	 * Valida el nombre del equipo en función del estado del dispositivo.
	 * @static
	 * @param {object} props - Propiedades para la validación.
	 * @param {Primitives<ComputerName>} props.value - El valor del nombre del equipo.
	 * @param {Primitives<StatusId>} [props.status] - El ID del estado del dispositivo.
	 * @returns {boolean} `true` si el nombre del equipo es válido, `false` en caso contrario.
	 */	public static isValid({
		value,
		status
	}: {
		value: Primitives<ComputerName>
		status?: Primitives<StatusId>
	}): boolean {
		ComputerName.updateError('')
		if (!status) return true
		switch (status) {
			case StatusOptions.INUSE:
			case StatusOptions.PRESTAMO:
			case StatusOptions.CONTINGENCIA:
			case StatusOptions.JORNADA:
			case StatusOptions.GUARDIA:
				if (!value) {
					this.updateError(
						'El nombre de equipo no puede estar en blanco si el equipo esta en uso'
					)
					return false
				}
				break
			case StatusOptions.INALMACEN:
			case StatusOptions.PORDESINCORPORAR:
			case StatusOptions.DESINCORPORADO:
				if (value) {
					this.updateError(
						'Si el equipo no está en uso, el nombre de equipo debe quedar en blanco'
					)
					return false
				}
				break
			default:
				break
		}
		if (!value) {
			return true
		}
		const errorMesagge: string[] = []
		const isHasNotSpecialCharacterOnlyGuiones = this.notSpecialCharacterOnlyGuiones.test(value)
		if (!isHasNotSpecialCharacterOnlyGuiones) {
			errorMesagge.push('El Nombre de equipo no puede contener caracteres especiales.')
		}
		const isNotHasLowerCharacter = this.notLowerCase.test(value)
		if (!isNotHasLowerCharacter) {
			errorMesagge.push('El Nombre de equipo debe estar en mayúsculas.')
		}
		const isNameValidLength =
			value.length >= this.NAME_MIN_LENGTH && value.length <= this.NAME_MAX_LENGTH
		if (!isNameValidLength) {
			errorMesagge.push(
				`El Nombre de equipo debe tener entre ${this.NAME_MIN_LENGTH} y ${this.NAME_MAX_LENGTH} caracteres.`
			)
		}
		this.updateError(errorMesagge.join(' '))
		return isHasNotSpecialCharacterOnlyGuiones && isNotHasLowerCharacter && isNameValidLength
	}

	/**
	 * Obtiene el mensaje de error de validación.
	 * @static
	 * @returns {string} El mensaje de error.
	 */	public static invalidMessage(): string {
		return this.errorsValue
	}
}