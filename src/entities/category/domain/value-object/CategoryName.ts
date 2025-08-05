import { StringValueObject } from '@/entities/shared/domain/value-objects/StringValueObjects'

/**
 * `CategoryName`
 * @class
 * @extends {StringValueObject}
 * @description Value Object que representa el nombre de una `Category`.
 * Asegura que el nombre cumpla con ciertas reglas de negocio (longitud mínima y máxima).
 */
export class CategoryName extends StringValueObject {
	/**
	 * Longitud mínima permitida para el nombre de la categoría.
	 * @static
	 * @type {number}
	 */	static readonly NAME_MIN_LENGTH = 2
	/**
	 * Longitud máxima permitida para el nombre de la categoría.
	 * @static
	 * @type {number}
	 */	static readonly NAME_MAX_LENGTH = 100

	/**
	 * Crea una instancia de `CategoryName`.
	 * @param {string} value - El valor del nombre de la categoría.
	 * @throws {Error} Si el valor no es válido según las reglas definidas.
	 */	constructor(value: string) {
		super(value)
		if (!CategoryName.isValid(value)) {
			throw new Error(CategoryName.invalidMessage(value))
		}
	}

	/**
	 * Verifica si un valor dado es un nombre de categoría válido.
	 * @static
	 * @param {string} value - El valor a validar.
	 * @returns {boolean} `true` si el valor es válido, `false` en caso contrario.
	 */	public static isValid(value: string): boolean {
		return (
			value.length >= CategoryName.NAME_MIN_LENGTH &&
			value.length <= CategoryName.NAME_MAX_LENGTH
		)
	}

	/**
	 * Genera un mensaje de error para un nombre de categoría inválido.
	 * @static
	 * @param {string} value - El valor inválido.
	 * @returns {string} El mensaje de error.
	 */	public static invalidMessage(value: string): string {
		return `El nombre ${value} no es válido. Debe tener entre ${CategoryName.NAME_MIN_LENGTH} y ${CategoryName.NAME_MAX_LENGTH} caracteres`
	}
}