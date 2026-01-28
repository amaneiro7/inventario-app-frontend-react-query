import { NumberValueObject } from '@/entities/shared/domain/value-objects/NumberValueObject'

/**
 * @class HardDriveHealth
 * @extends {NumberValueObject}
 * @description Value Object que representa el estado de salud de un disco duro.
 * Asegura que el valor esté dentro de un rango definido (0-100).
 */
export class HardDriveHealth extends NumberValueObject {
	/**
	 * Valor mínimo permitido para el estado de salud.
	 * @static
	 * @type {number}
	 */ static readonly MIN = 0
	/**
	 * Valor máximo permitido para el estado de salud.
	 * @static
	 * @type {number}
	 */ static readonly MAX = 100

	/**
	 * Crea una instancia de `HardDriveHealth`.
	 * @param {number} value - El valor del estado de salud.
	 * @throws {Error} Si el valor no es válido según las reglas definidas.
	 */ constructor(value: number) {
		super(value)
		if (!HardDriveHealth.isValid({ value })) {
			throw new Error(HardDriveHealth.invalidMessage())
		}
	}

	/**
	 * Valida el estado de salud del disco duro.
	 * @static
	 * @param {object} props - Propiedades para la validación.
	 * @param {number} props.value - El valor del estado de salud a validar.
	 * @returns {boolean} `true` si el valor es válido, `false` en caso contrario.
	 */ public static isValid({ value }: { value: number }): boolean {
		return value >= HardDriveHealth.MIN && value <= HardDriveHealth.MAX
	}

	/**
	 * Genera un mensaje de error para un estado de salud inválido.
	 * @static
	 * @returns {string} El mensaje de error.
	 */ public static invalidMessage(): string {
		return `Invalid hard drive health sentities, must be between ${HardDriveHealth.MIN} and ${HardDriveHealth.MAX}`
	}
}
