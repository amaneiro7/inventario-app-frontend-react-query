import { NumberValueObject } from '@/entities/shared/domain/value-objects/NumberValueObject'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'

/**
 * @class MemoryRamValues
 * @extends {NumberValueObject}
 * @description Value Object que representa un valor específico de memoria RAM (ej. 4, 8, 16 GB).
 * Asegura que el valor sea uno de los definidos en una secuencia generada.
 */
export class MemoryRamValues extends NumberValueObject {
	/**
	 * Valor mínimo permitido para la memoria RAM.
	 * @static
	 * @type {number}
	 */ static readonly min: number = 0
	/**
	 * Valor máximo permitido para la memoria RAM.
	 * @static
	 * @type {number}
	 */ static readonly max: number = 32
	/**
	 * Número de pasos para generar la secuencia de valores de memoria RAM.
	 * @static
	 * @type {number}
	 */ static readonly numStep: number = 9
	/**
	 * Paso mínimo calculado para la secuencia de memoria RAM.
	 * @static
	 * @type {number}
	 */ static readonly minStep: number = this.max / Math.pow(2, this.numStep - 1)

	/**
	 * Crea una instancia de `MemoryRamValues`.
	 * @param {number} value - El valor de la memoria RAM.
	 * @throws {Error} Si el valor no es válido según las reglas definidas.
	 */ constructor(value: number) {
		super(value)
		if (!MemoryRamValues.isValid(this.value)) {
			throw new Error(MemoryRamValues.invalidMessage())
		}
	}

	/**
	 * Crea una instancia de `MemoryRamValues` a partir de un valor primitivo.
	 * @static
	 * @param {Primitives<MemoryRamValues>} value - El valor primitivo de la memoria RAM.
	 * @returns {MemoryRamValues} Una nueva instancia de `MemoryRamValues`.
	 */ public static fromValues(value: Primitives<MemoryRamValues>): MemoryRamValues {
		return new MemoryRamValues(value)
	}

	/**
	 * Genera una secuencia de valores válidos para la memoria RAM.
	 * @static
	 * @returns {number[]} Un array de números que representan los valores válidos de memoria RAM.
	 */ static generarSecuencia(): number[] {
		const secuencia: number[] = [this.min]
		let valorActual = this.minStep
		for (let i = 0; i < this.numStep; i++) {
			secuencia.push(valorActual)
			valorActual *= 2
		}
		return secuencia
	}

	/**
	 * Valida un valor de memoria RAM.
	 * @static
	 * @param {Primitives<MemoryRamValues>} value - El valor a validar.
	 * @returns {boolean} `true` si el valor es válido, `false` en caso contrario.
	 */ public static isValid(value: Primitives<MemoryRamValues>): boolean {
		const numberValue = Number(value)
		const secuencia = this.generarSecuencia()
		return secuencia.includes(numberValue)
	}

	/**
	 * Obtiene el mensaje de error de validación.
	 * @static
	 * @returns {string} El mensaje de error.
	 */ public static invalidMessage(): string {
		return 'Capacidad de Memoria Ram no válida'
	}
}
