import { StringValueObject } from '@/entities/shared/domain/value-objects/StringValueObjects'

/**
 * `PermissionGroupDescription`
 * @class
 * @extends {StringValueObject}
 * @description Value Object que representa el nombre de una `Permission`.
 * Asegura que el nombre cumpla con ciertas reglas de negocio (longitud mínima y máxima).
 */

export class PermissionGroupDescription extends StringValueObject {
	/**
	 * Longitud mínima permitida para el nombre de la marca.
	 * @static
	 * @type {number}
	 */
	static readonly NAME_MIN_LENGTH: number = 2
	/**
	 * Longitud máxima permitida para el nombre de la marca.
	 * @static
	 * @type {number}
	 */
	static readonly NAME_MAX_LENGTH: number = 255

	/**
	 * Crea una instancia de `PermissionGroupDescription`.
	 * @param {string} value - El valor del nombre de la marca.
	 * @throws {Error} Si el valor no es válido según las reglas definidas.
	 */
	constructor(value: string) {
		super(value)
		if (!PermissionGroupDescription.isValid(value)) {
			throw new Error(PermissionGroupDescription.invalidMessage(value))
		}
	}

	/**
	 * Verifica si un valor dado es un nombre de marca válido.
	 * @static
	 * @param {string} value - El valor a validar.
	 * @returns {boolean} `true` si el valor es válido, `false` en caso contrario.
	 */
	public static isValid(value: string): boolean {
		return (
			value.length >= PermissionGroupDescription.NAME_MIN_LENGTH &&
			value.length <= PermissionGroupDescription.NAME_MAX_LENGTH
		)
	}

	/**
	 * Genera un mensaje de error para un nombre de marca inválido.
	 * @static
	 * @param {string} value - El valor inválido.
	 * @returns {string} El mensaje de error.
	 */
	public static invalidMessage(value: string): string {
		return `El nombre ${value} no es válido. Debe tener entre ${PermissionGroupDescription.NAME_MIN_LENGTH} y ${PermissionGroupDescription.NAME_MAX_LENGTH} caracteres`
	}
}
