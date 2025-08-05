import { NumberValueObject } from '@/entities/shared/domain/value-objects/NumberValueObject'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type StatusId } from '@/entities/status/status/domain/value-object/StatusId'
import { StatusOptions } from '@/entities/status/status/domain/entity/StatusOptions'

/**
 * @class MemoryRamCapacity
 * @extends {NumberValueObject}
 * @description Value Object que representa la capacidad total de memoria RAM de un dispositivo.
 * Incluye validación de rango y reglas de negocio basadas en el estado del dispositivo.
 */
export class MemoryRamCapacity extends NumberValueObject {
	/**
	 * Paso mínimo para la capacidad de memoria RAM.
	 * @static
	 * @type {number}
	 */	static readonly minStep = 0.25
	/**
	 * Valor mínimo permitido para la capacidad de memoria RAM.
	 * @static
	 * @type {number}
	 */	static readonly min = 0
	/**
	 * Valor máximo permitido para la capacidad de memoria RAM.
	 * @static
	 * @type {number}
	 */	static readonly max = 32 * this.minStep
	private static errors = ''

	/**
	 * Crea una instancia de `MemoryRamCapacity`.
	 * @param {number} value - El valor de la capacidad de memoria RAM.
	 * @param {Primitives<StatusId>} status - El ID del estado del dispositivo asociado.
	 * @throws {Error} Si el valor no es válido según las reglas de negocio.
	 */	constructor(
		value: number,
		private readonly status: Primitives<StatusId>
	) {
		super(value)
		if (!MemoryRamCapacity.isValid(this.value, this.status)) {
			throw new Error(MemoryRamCapacity.invalidMessage())
		}
	}

	/**
	 * Actualiza el mensaje de error estático.
	 * @private
	 * @param {string} error - El mensaje de error a establecer.
	 */	private static updateError(error: string): void {
		MemoryRamCapacity.errors = error
	}

	/**
	 * Obtiene el mensaje de error estático.
	 * @private
	 * @type {string}
	 */	private static get errorsValue(): string {
		return MemoryRamCapacity.errors
	}

	/**
	 * Valida la capacidad de memoria RAM en función del estado del dispositivo.
	 * @static
	 * @param {Primitives<MemoryRamCapacity>} value - El valor de la capacidad de memoria RAM a validar.
	 * @param {Primitives<StatusId>} status - El ID del estado del dispositivo.
	 * @returns {boolean} `true` si la capacidad es válida, `false` en caso contrario.
	 */	public static isValid(
		value: Primitives<MemoryRamCapacity>,
		status: Primitives<StatusId>
	): boolean {
		const numberValue = Number(value)

		if (StatusOptions.INUSE === status && numberValue === 0) {
			MemoryRamCapacity.updateError(
				'La capacidad de la memoria Ram no puede ser 0 si el equipo está en uso'
			)
			return false
		}
		if (numberValue % this.minStep === 0) {
			return true
		} else {
			MemoryRamCapacity.updateError('Capacidad de Memoria Ram no válida')
			return false
		}
	}

	/**
	 * Obtiene el mensaje de error de validación.
	 * @static
	 * @returns {string} El mensaje de error.
	 */	public static invalidMessage(): string {
		return MemoryRamCapacity.errorsValue
	}
}