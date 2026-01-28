import { AcceptedNullValueObject } from '@/entities/shared/domain/value-objects/AcceptedNullValueObject'
import { StatusOptions } from '@/entities/status/status/domain/entity/StatusOptions'
import { type ProcessorId } from '@/entities/devices/features/processor/domain/value-object/ProcessorId'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type StatusId } from '@/entities/status/status/domain/value-object/StatusId'

/**
 * @class ComputerProcessor
 * @extends {AcceptedNullValueObject<Primitives<ProcessorId>>}
 * @description Value Object que representa el procesador de una computadora.
 * Incluye lógica de validación basada en el estado del dispositivo.
 */
export class ComputerProcessor extends AcceptedNullValueObject<Primitives<ProcessorId>> {
	private static errors = ''

	/**
	 * Crea una instancia de `ComputerProcessor`.
	 * @param {Primitives<ProcessorId> | null} value - El valor del ID del procesador.
	 * @param {Primitives<StatusId>} status - El ID del estado del dispositivo asociado.
	 * @throws {Error} Si el valor no es válido según las reglas de negocio.
	 */ constructor(
		value: Primitives<ProcessorId> | null,
		private readonly status: Primitives<StatusId>
	) {
		super(value)

		if (!ComputerProcessor.isValid({ value: this.value, status: this.status })) {
			throw new Error(ComputerProcessor.invalidMessage())
		}
	}

	/**
	 * Actualiza el mensaje de error estático.
	 * @private
	 * @param {string} error - El mensaje de error a establecer.
	 */ private static updateError(error: string): void {
		ComputerProcessor.errors = error
	}

	/**
	 * Obtiene el mensaje de error estático.
	 * @private
	 * @type {string}
	 */ private static get errorsValue(): string {
		return ComputerProcessor.errors
	}

	/**
	 * Valida el procesador en función del estado del dispositivo.
	 * @static
	 * @param {object} props - Propiedades para la validación.
	 * @param {Primitives<ComputerProcessor>} props.value - El valor del procesador.
	 * @param {Primitives<StatusId>} [props.status] - El ID del estado del dispositivo.
	 * @returns {boolean} `true` si el procesador es válido, `false` en caso contrario.
	 */ public static isValid({
		value,
		status
	}: {
		value: Primitives<ComputerProcessor>
		status?: Primitives<StatusId>
	}): boolean {
		ComputerProcessor.updateError('')

		if (!status) {
			return true // Si no hay status, no hay validación específica
		}

		switch (status) {
			case StatusOptions.INUSE:
			case StatusOptions.INALMACEN:
			case StatusOptions.PRESTAMO:
			case StatusOptions.JORNADA:
			case StatusOptions.GUARDIA:
			case StatusOptions.CONTINGENCIA:
				if (!value) {
					ComputerProcessor.updateError(
						'Si esta en uso o en almacén, el procesador es requerido.'
					)
					return false
				}
				break
			default:
				break // No hay validaciones específicas para otros estados
		}
		return true
	}

	/**
	 * Obtiene el mensaje de error de validación.
	 * @static
	 * @returns {string} El mensaje de error.
	 */ public static invalidMessage(): string {
		return ComputerProcessor.errorsValue
	}
}
