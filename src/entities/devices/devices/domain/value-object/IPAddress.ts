import { AcceptedNullValueObject } from '@/entities/shared/domain/value-objects/AcceptedNullValueObject'
import { StatusOptions } from '@/entities/status/status/domain/entity/StatusOptions'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { StatusId } from '@/entities/status/status/domain/value-object/StatusId'

/**
 * @class IPAddress
 * @extends {AcceptedNullValueObject<string>}
 * @description Value Object que representa una dirección IP.
 * Incluye validación de formato y reglas de negocio basadas en el estado del dispositivo.
 */
export class IPAddress extends AcceptedNullValueObject<string> {
	/**
	 * Expresión regular para validar el formato de una dirección IP.
	 * @static
	 * @type {RegExp}
	 */	static readonly IPADRRESS_VALIDATION =
		/^([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(\.(?:[0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])){3}$/
	private static errors = ''

	/**
	 * Crea una instancia de `IPAddress`.
	 * @param {string | null} value - El valor de la dirección IP.
	 * @param {Primitives<StatusId>} status - El ID del estado del dispositivo asociado.
	 * @throws {Error} Si el valor no es válido según las reglas de negocio.
	 */	constructor(
		value: string | null,
		private readonly status: Primitives<StatusId>
	) {
		super(value)

		if (!IPAddress.isValid({ value: this.value, status: this.status })) {
			throw new Error(IPAddress.invalidMessage())
		}
	}

	/**
	 * Actualiza el mensaje de error estático.
	 * @static
	 * @param {string} error - El mensaje de error a establecer.
	 */	static updateError(error: string): void {
		IPAddress.errors = error
	}

	/**
	 * Obtiene el mensaje de error estático.
	 * @static
	 * @type {string}
	 */	private static get errorsValue(): string {
		return IPAddress.errors
	}

	/**
	 * Valida la dirección IP en función del estado del dispositivo.
	 * @static
	 * @param {object} props - Propiedades para la validación.
	 * @param {Primitives<IPAddress>} props.value - El valor de la dirección IP.
	 * @param {Primitives<StatusId>} [props.status] - El ID del estado del dispositivo.
	 * @returns {boolean} `true` si la dirección IP es válida, `false` en caso contrario.
	 */	public static isValid({
		value,
		status
	}: {
		value: Primitives<IPAddress>
		status?: Primitives<StatusId>
	}): boolean {
		IPAddress.updateError('')
		if (!status) return true // No hay validaciones si no hay status
		switch (status) {
			case StatusOptions.INUSE:
				if (!value) {
					IPAddress.updateError('Si el equipo esta en uso la dirección IP es requerida.')
					return false
				}
				break
			case StatusOptions.INALMACEN:
			case StatusOptions.PORDESINCORPORAR:
			case StatusOptions.DESINCORPORADO:
				if (value) {
					IPAddress.updateError(
						'Si el equipo no está en uso, no puede tener dirección IP.'
					)
					return true // No hay más validaciones si no está en uso
				}
				return true
			default:
				break
		}
		if (!value) {
			return true
		}

		if (!IPAddress.IPADRRESS_VALIDATION.test(value)) {
			IPAddress.updateError(
				`No es un dirección IP válida, el formato debe tener un formato xxx.xxx.xxx.xxx`
			)
			return false
		}
		return true
	}

	/**
	 * Obtiene el mensaje de error de validación.
	 * @static
	 * @returns {string} El mensaje de error.
	 */	public static invalidMessage(): string {
		return IPAddress.errorsValue
	}
}