import { StringValueObject } from '@/entities/shared/domain/value-objects/StringValueObjects'

export class AccessPolicyName extends StringValueObject {
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
	 * Crea una instancia de `AccessPolicyName`.
	 * @param {string} value - El valor del nombre de la marca.
	 * @throws {Error} Si el valor no es válido según las reglas definidas.
	 */ constructor(value: string) {
		super(value)
		if (!AccessPolicyName.isValid(value)) {
			throw new Error(AccessPolicyName.invalidMessage(value))
		}
	}

	/**
	 * Verifica si un valor dado es un nombre de marca válido.
	 * @static
	 * @param {string} value - El valor a validar.
	 * @returns {boolean} `true` si el valor es válido, `false` en caso contrario.
	 */ public static isValid(value: string): boolean {
		return (
			value.length >= AccessPolicyName.NAME_MIN_LENGTH &&
			value.length <= AccessPolicyName.NAME_MAX_LENGTH
		)
	}

	/**
	 * Genera un mensaje de error para un nombre de marca inválido.
	 * @static
	 * @param {string} value - El valor inválido.
	 * @returns {string} El mensaje de error.
	 */ public static invalidMessage(value: string): string {
		return `El nombre ${value} no es válido. Debe tener entre ${AccessPolicyName.NAME_MIN_LENGTH} y ${AccessPolicyName.NAME_MAX_LENGTH} caracteres`
	}
}
