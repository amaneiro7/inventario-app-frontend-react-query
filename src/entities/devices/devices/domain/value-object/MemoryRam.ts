import { MemoryRamValues } from './MemoryRamValues'
import { StatusOptions } from '@/entities/status/status/domain/entity/StatusOptions'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type StatusId } from '@/entities/status/status/domain/value-object/StatusId'

/**
 * @class MemoryRam
 * @description Value Object que representa la configuración de la memoria RAM de un dispositivo.
 * Maneja un array de valores de memoria RAM y valida la capacidad total en función del estado del dispositivo.
 */
export class MemoryRam {
	/**
	 * Crea una instancia de `MemoryRam`.
	 * @param {MemoryRamValues[]} value - Un array de Value Objects `MemoryRamValues`.
	 */ constructor(readonly value: MemoryRamValues[]) {}

	/**
	 * Convierte el array de Value Objects `MemoryRamValues` a un array de sus representaciones primitivas.
	 * @returns {Primitives<MemoryRamValues>[]} Un array de valores primitivos de memoria RAM.
	 */ public toPrimitives(): Primitives<MemoryRamValues>[] {
		return this.value.map(memValue => memValue.value)
	}

	/**
	 * Crea una instancia de `MemoryRam` a partir de un array de valores primitivos.
	 * @static
	 * @param {Primitives<MemoryRamValues>[]} memoryRamValues - Un array de valores primitivos de memoria RAM.
	 * @param {Primitives<StatusId>} status - El ID del estado del dispositivo asociado.
	 * @returns {MemoryRam} Una nueva instancia de `MemoryRam`.
	 * @throws {Error} Si la validación falla.
	 */ static fromPrimitives(
		memoryRamValues: Primitives<MemoryRamValues>[],
		status: Primitives<StatusId>
	) {
		if (!MemoryRam.isValid({ value: memoryRamValues, status })) {
			throw new Error(MemoryRam.invalidMessage())
		}
		return new MemoryRam(memoryRamValues.map(MemoryRamValues.fromValues))
	}

	/**
	 * Valida la configuración de la memoria RAM en función del estado del dispositivo.
	 * @static
	 * @param {object} props - Propiedades para la validación.
	 * @param {Primitives<MemoryRamValues>[]} props.value - El array de valores de memoria RAM.
	 * @param {Primitives<StatusId>} [props.status] - El ID del estado del dispositivo.
	 * @returns {boolean} `true` si la configuración es válida, `false` en caso contrario.
	 */ public static isValid({
		value,
		status
	}: {
		value: Primitives<MemoryRamValues>[]
		status?: Primitives<StatusId>
	}): boolean {
		if (!status) {
			return true
		}

		switch (status) {
			case StatusOptions.INUSE:
			case StatusOptions.PRESTAMO:
			case StatusOptions.CONTINGENCIA:
			case StatusOptions.GUARDIA:
				if (MemoryRam.isZeroTotalMemory(value) && !this.isEmpty(value)) {
					return false
				}
				break
			default:
				break
		}
		return true
	}

	/**
	 * Obtiene el mensaje de error de validación.
	 * @static
	 * @returns {string} El mensaje de error.
	 */ public static invalidMessage(): string {
		return 'La capacidad de la memoria Ram no puede ser 0 si el equipo está en uso.'
	}

	/**
	 * Verifica si el array de valores de memoria RAM está vacío o es nulo.
	 * @private
	 * @static
	 * @param {Primitives<MemoryRamValues>[] | null} [value] - El array de valores de memoria RAM.
	 * @returns {boolean} `true` si el array está vacío o es nulo, `false` en caso contrario.
	 */ private static isEmpty(value?: Primitives<MemoryRamValues>[] | null): boolean {
		return !value || value.length === 0
	}

	/**
	 * Calcula la cantidad total de memoria RAM a partir de un array de valores primitivos.
	 * @static
	 * @param {Primitives<MemoryRamValues>[]} value - El array de valores primitivos de memoria RAM.
	 * @returns {number} La cantidad total de memoria RAM.
	 */ static totalAmount(value: Primitives<MemoryRamValues>[]): number {
		return value.reduce((acc, val) => acc + Number(val), 0)
	}

	/**
	 * Verifica si la cantidad total de memoria RAM es cero.
	 * @static
	 * @param {Primitives<MemoryRamValues>[]} value - El array de valores primitivos de memoria RAM.
	 * @returns {boolean} `true` si la cantidad total es cero, `false` en caso contrario.
	 */ public static isZeroTotalMemory(value: Primitives<MemoryRamValues>[]): boolean {
		return this.totalAmount(value) === 0
	}
}
