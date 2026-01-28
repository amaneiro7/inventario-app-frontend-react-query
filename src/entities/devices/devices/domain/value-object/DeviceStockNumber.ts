import { AcceptedNullValueObject } from '@/entities/shared/domain/value-objects/AcceptedNullValueObject'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { StatusOptions } from '@/entities/status/status/domain/entity/StatusOptions'
import { StatusId } from '@/entities/status/status/domain/value-object/StatusId'

/**
 * @class DeviceStockNumber
 * @extends {AcceptedNullValueObject<string>}
 * @description Value Object que representa el número de stock de un dispositivo.
 * Incluye validación de longitud y reglas de negocio basadas en el estado del dispositivo.
 */
export class DeviceStockNumber extends AcceptedNullValueObject<string> {
	/**
	 * Longitud mínima permitida para el número de stock.
	 * @static
	 * @type {number}
	 */ static readonly NAME_MIN_LENGTH = 2
	/**
	 * Longitud máxima permitida para el número de stock.
	 * @static
	 * @type {number}
	 */ static readonly NAME_MAX_LENGTH = 10
	private static errors = ''

	/**
	 * Crea una instancia de `DeviceStockNumber`.
	 * @param {string | null} value - El valor del número de stock.
	 * @param {Primitives<StatusId>} status - El ID del estado del dispositivo asociado.
	 * @throws {Error} Si el valor no es válido según las reglas de negocio.
	 */ constructor(
		value: string | null,
		private readonly status: Primitives<StatusId>
	) {
		super(value)
		if (!DeviceStockNumber.isValid({ value: this.value, status: this.status })) {
			throw new Error(DeviceStockNumber.invalidMessage())
		}
	}

	/**
	 * Actualiza el mensaje de error estático.
	 * @private
	 * @param {string} error - El mensaje de error a establecer.
	 */ private static updateError(error: string): void {
		this.errors = error
	}

	/**
	 * Obtiene el mensaje de error estático.
	 * @private
	 * @type {string}
	 */ private static get errorsValue(): string {
		return DeviceStockNumber.errors
	}

	/**
	 * Valida el número de stock en función del estado del dispositivo.
	 * @static
	 * @param {object} props - Propiedades para la validación.
	 * @param {string | null} props.value - El valor del número de stock a validar.
	 * @param {Primitives<StatusId>} [props.status] - El ID del estado del dispositivo.
	 * @returns {boolean} `true` si el número de stock es válido, `false` en caso contrario.
	 */ public static isValid({
		value,
		status
	}: {
		value: string | null
		status?: Primitives<StatusId>
	}): boolean {
		DeviceStockNumber.updateError('') // Limpia errores previos

		if (!value) return true // No hay validaciones si el valor es nulo o vacio

		switch (status) {
			case StatusOptions.INALMACEN:
			case StatusOptions.PORDESINCORPORAR:
				break
			default:
				DeviceStockNumber.errors =
					'Si no está en almacén no se le puede agregar un numero de stock.'
				return false
		}

		const isNameValidLength =
			value.length >= this.NAME_MIN_LENGTH && value.length <= this.NAME_MAX_LENGTH
		if (!isNameValidLength) {
			DeviceStockNumber.updateError(
				`El Número de stock debe tener entre ${this.NAME_MIN_LENGTH} y ${this.NAME_MAX_LENGTH} caracteres.`
			)
		}
		return true
	}

	/**
	 * Obtiene el mensaje de error de validación.
	 * @static
	 * @returns {string} El mensaje de error.
	 */ public static invalidMessage(): string {
		return DeviceStockNumber.errorsValue
	}
}
