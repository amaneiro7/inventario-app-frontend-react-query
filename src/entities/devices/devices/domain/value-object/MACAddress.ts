import { AcceptedNullValueObject } from '@/entities/shared/domain/value-objects/AcceptedNullValueObject'

/**
 * @class MACAddress
 * @extends {AcceptedNullValueObject<string>}
 * @description Value Object que representa una dirección MAC.
 * Incluye validación de formato.
 */
export class MACAddress extends AcceptedNullValueObject<string> {
	/**
	 * Expresión regular para validar el formato de una dirección MAC.
	 * @static
	 * @type {RegExp}
	 */	static readonly macAddressRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/

	/**
	 * Crea una instancia de `MACAddress`.
	 * @param {string | null} value - El valor de la dirección MAC.
	 * @throws {Error} Si el valor no es válido según las reglas definidas.
	 */	constructor(value: string | null) {
		super(value)

		if (!MACAddress.isValid({ value: this.value })) {
			throw new Error(MACAddress.invalidMessage(value))
		}
	}

	/**
	 * Valida la dirección MAC.
	 * @static
	 * @param {object} props - Propiedades para la validación.
	 * @param {string | null} props.value - El valor de la dirección MAC a validar.
	 * @returns {boolean} `true` si la dirección MAC es válida, `false` en caso contrario.
	 */	public static isValid({ value }: { value: string | null }): boolean {
		if (value === null || value === '') return true
		return this.macAddressRegex.test(value)
	}

	/**
	 * Genera un mensaje de error para una dirección MAC inválida.
	 * @static
	 * @param {string | null | '' | undefined} value - El valor inválido.
	 * @returns {string} El mensaje de error.
	 */	public static invalidMessage(value: string | null | '' | undefined): string {
		return `"${value}" no es una dirección MAC válida, Una Dirección IP válida debe tener un formato xx-xx-xx-xx-xx-xx de valores hexadecimales`
	}
}