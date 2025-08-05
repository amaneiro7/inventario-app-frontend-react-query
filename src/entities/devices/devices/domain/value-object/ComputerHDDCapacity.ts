import { AcceptedNullValueObject } from '@/entities/shared/domain/value-objects/AcceptedNullValueObject'
import { StatusOptions } from '@/entities/status/status/domain/entity/StatusOptions'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type HardDriveCapacityId } from '@/entities/devices/features/hardDrive/hardDriveCapacity/domain/value-object/HardDriveCapacityId'
import { type StatusId } from '@/entities/status/status/domain/value-object/StatusId'

/**
 * @class ComputerHDDCapacity
 * @extends {AcceptedNullValueObject<Primitives<HardDriveCapacityId>>}
 * @description Value Object que representa la capacidad del disco duro de una computadora.
 * Incluye lógica de validación basada en el estado del dispositivo.
 */
export class ComputerHDDCapacity extends AcceptedNullValueObject<Primitives<HardDriveCapacityId>> {
	private static errors = ''

	/**
	 * Crea una instancia de `ComputerHDDCapacity`.
	 * @param {Primitives<HardDriveCapacityId> | null} value - El valor de la capacidad del disco duro.
	 * @param {Primitives<StatusId>} status - El ID del estado del dispositivo asociado.
	 * @throws {Error} Si el valor no es válido según las reglas de negocio.
	 */	constructor(
		value: Primitives<HardDriveCapacityId> | null,
		private readonly status: Primitives<StatusId>
	) {
		super(value)

		if (!ComputerHDDCapacity.isValid({ value: this.value, status: this.status })) {
			throw new Error(ComputerHDDCapacity.invalidMessage())
		}
	}

	/**
	 * Actualiza el mensaje de error estático.
	 * @private
	 * @param {string} error - El mensaje de error a establecer.
	 */	private static updateError(error: string): void {
		ComputerHDDCapacity.errors = error
	}

	/**
	 * Obtiene el mensaje de error estático.
	 * @private
	 * @type {string}
	 */	private static get errorsValue(): string {
		return ComputerHDDCapacity.errors
	}

	/**
	 * Valida la capacidad del disco duro en función del estado del dispositivo.
	 * @static
	 * @param {object} props - Propiedades para la validación.
	 * @param {Primitives<ComputerHDDCapacity>} [props.value] - El valor de la capacidad del disco duro.
	 * @param {Primitives<StatusId>} [props.status] - El ID del estado del dispositivo.
	 * @returns {boolean} `true` si la capacidad es válida, `false` en caso contrario.
	 */	public static isValid({
		value,
		status
	}: {
		value?: Primitives<ComputerHDDCapacity>
		status?: Primitives<StatusId>
	}): boolean {
		ComputerHDDCapacity.updateError('')
		if (!status) return true

		switch (status) {
			case StatusOptions.INUSE:
			case StatusOptions.PRESTAMO:
			case StatusOptions.CONTINGENCIA:
			case StatusOptions.GUARDIA:
				if (!value) {
					ComputerHDDCapacity.updateError(
						'Si el equipo está en uso, no se puede dejar en blanco la capacidad del Disco Duro'
					)
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
	 */	public static invalidMessage(): string {
		return ComputerHDDCapacity.errorsValue
	}
}