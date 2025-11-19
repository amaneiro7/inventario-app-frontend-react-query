import { StringValueObject } from '@/entities/shared/domain/value-objects/StringValueObjects'

/**
 * `PermissionGroupName`
 * @class
 * @extends {StringValueObject}
 * @description Value Object que representa el nombre de una `Permission`.
 * Asegura que el nombre cumpla con ciertas reglas de negocio (longitud mínima y máxima).
 */
export class PermissionGroupName extends StringValueObject {
	/**
	 * Longitud mínima permitida para el nombre de la marca.
	 * @static
	 * @type {number}
	 */ static readonly NAME_MIN_LENGTH = 2
	/**
	 * Longitud máxima permitida para el nombre de la marca.
	 * @static
	 * @type {number}
	 */ static readonly NAME_MAX_LENGTH = 100

	/**
	 * Crea una instancia de `PermissionGroupName`.
	 * @param {string} value - El valor del nombre de la marca.
	 * @throws {Error} Si el valor no es válido según las reglas definidas.
	 */ constructor(value: string) {
		super(value)
		if (!PermissionGroupName.isValid(value)) {
			throw new Error(PermissionGroupName.invalidMessage(value))
		}
	}

	/**
	 * Verifica si un valor dado es un nombre de marca válido.
	 * @static
	 * @param {string} value - El valor a validar.
	 * @returns {boolean} `true` si el valor es válido, `false` en caso contrario.
	 */ public static isValid(value: string): boolean {
		return (
			value.length >= PermissionGroupName.NAME_MIN_LENGTH &&
			value.length <= PermissionGroupName.NAME_MAX_LENGTH
		)
	}

	/**
	 * Genera un mensaje de error para un nombre de marca inválido.
	 * @static
	 * @param {string} value - El valor inválido.
	 * @returns {string} El mensaje de error.
	 */ public static invalidMessage(value: string): string {
		return `El nombre ${value} no es válido. Debe tener entre ${PermissionGroupName.NAME_MIN_LENGTH} y ${PermissionGroupName.NAME_MAX_LENGTH} caracteres`
	}
}
