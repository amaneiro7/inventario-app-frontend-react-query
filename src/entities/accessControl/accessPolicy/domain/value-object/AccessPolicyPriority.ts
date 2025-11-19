import { NumberValueObject } from '@/entities/shared/domain/value-objects/NumberValueObject'

/**
 * @class AccessPolicyPriority
 * @extends {NumberValueObject}
 * @description Value Object que representa la prioridad de una política de acceso. La prioridad debe ser un número entero entre 1 y 32.
 */
export class AccessPolicyPriority extends NumberValueObject {
	/** Valor mínimo permitido para la prioridad. */
	static readonly MIN = 1
	/** Valor máximo permitido para la prioridad. */
	static readonly MAX = 32

	/**
	 * Crea una instancia de `AccessPolicyPriority`.
	 * @param {number} value - El valor de la prioridad.
	 * @throws {Error} Si el valor no es válido según las reglas definidas.
	 */
	constructor(value: number) {
		super(value)
		if (!AccessPolicyPriority.isValid(value)) {
			throw new Error(AccessPolicyPriority.invalidMessage(value))
		}
	}
	/**
	 * Verifica si un valor dado es una prioridad válida.
	 * @static
	 * @param {number} value - El valor a validar.
	 * @returns {boolean} `true` si el valor es válido, `false` en caso contrario.
	 */
	public static isValid(value: number): boolean {
		return (
			Number.isInteger(value) &&
			value >= AccessPolicyPriority.MIN &&
			value <= AccessPolicyPriority.MAX
		)
	}

	public static invalidMessage(value: number): string {
		return `La prioridad "${value}" no es válida. Debe ser un número entero entre ${AccessPolicyPriority.MIN} y ${AccessPolicyPriority.MAX}.`
	}
}
