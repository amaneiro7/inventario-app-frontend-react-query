import { StringValueObject } from '@/entities/shared/domain/value-objects/StringValueObjects'

/**
 * @class ProcessorProductCollection
 * @extends {StringValueObject}
 * @description Value Object que representa la colección de productos de un procesador.
 * Asegura que el valor cumpla con ciertas reglas de negocio (longitud mínima y máxima).
 */
export class ProcessorProductCollection extends StringValueObject {
	/**
	 * Longitud mínima permitida para la colección de productos.
	 * @static
	 * @type {number}
	 */	static readonly NAME_MIN_LENGTH = 3
	/**
	 * Longitud máxima permitida para la colección de productos.
	 * @static
	 * @type {number}
	 */	static readonly NAME_MAX_LENGTH = 100

	/**
	 * Crea una instancia de `ProcessorProductCollection`.
	 * @param {string} value - El valor de la colección de productos.
	 * @throws {Error} Si el valor no es válido según las reglas definidas.
	 */	constructor(value: string) {
		super(value)
		if (!ProcessorProductCollection.isValid(value)) {
			throw new Error(ProcessorProductCollection.invalidMessage(value))
		}
	}

	/**
	 * Valida la colección de productos del procesador.
	 * @static
	 * @param {string} value - El valor a validar.
	 * @returns {boolean} `true` si el valor es válido, `false` en caso contrario.
	 */	public static isValid(value: string): boolean {
		return (
			value?.length >= ProcessorProductCollection.NAME_MIN_LENGTH &&
			value?.length <= ProcessorProductCollection.NAME_MAX_LENGTH
		)
	}

	/**
	 * Genera un mensaje de error para una colección de productos inválida.
	 * @static
	 * @param {string} value - El valor inválido.
	 * @returns {string} El mensaje de error.
	 */	public static invalidMessage(value: string): string {
		return `El nombre ${value} no es válido. Debe tener entre ${ProcessorProductCollection.NAME_MIN_LENGTH} y ${ProcessorProductCollection.NAME_MAX_LENGTH} caracteres`
	}
}