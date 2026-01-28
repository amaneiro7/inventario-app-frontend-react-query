import { AcceptedNullValueObject } from '@/entities/shared/domain/value-objects/AcceptedNullValueObject'
import { StatusOptions } from '@/entities/status/status/domain/entity/StatusOptions'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type OperatingSystemId } from '@/entities/devices/features/operatingSystem/operatingSystem/domain/value-object/OperatingSystemId'
import { type StatusId } from '@/entities/status/status/domain/value-object/StatusId'
import { type ComputerHDDCapacity } from './ComputerHDDCapacity'

/**
 * @class ComputerOs
 * @extends {AcceptedNullValueObject<Primitives<OperatingSystemId>>}
 * @description Value Object que representa el sistema operativo de una computadora.
 * Incluye lógica de validación basada en el estado del dispositivo y la capacidad del disco duro.
 */
export class ComputerOs extends AcceptedNullValueObject<Primitives<OperatingSystemId>> {
	private static errors = ''

	/**
	 * Crea una instancia de `ComputerOs`.
	 * @param {Primitives<OperatingSystemId> | null} value - El valor del ID del sistema operativo.
	 * @param {Primitives<StatusId>} status - El ID del estado del dispositivo asociado.
	 * @param {Primitives<ComputerHDDCapacity> | null} hardDriveCapacity - La capacidad del disco duro asociada.
	 * @throws {Error} Si el valor no es válido según las reglas de negocio.
	 */ constructor(
		value: Primitives<OperatingSystemId> | null,
		private readonly status: Primitives<StatusId>,
		private readonly hardDriveCapacity: Primitives<ComputerHDDCapacity> | null
	) {
		super(value)

		if (
			!ComputerOs.isValid({
				value: this.value,
				status: this.status,
				hardDriveCapacity: this.hardDriveCapacity
			})
		) {
			throw new Error(ComputerOs.invalidMessage())
		}
	}

	/**
	 * Actualiza el mensaje de error estático.
	 * @private
	 * @param {string} error - El mensaje de error a establecer.
	 */ private static updateError(error: string): void {
		ComputerOs.errors = error
	}

	/**
	 * Obtiene el mensaje de error estático.
	 * @private
	 * @type {string}
	 */ private static get errorsValue(): string {
		return ComputerOs.errors
	}

	/**
	 * Valida el sistema operativo en función del estado del dispositivo y la capacidad del disco duro.
	 * @static
	 * @param {object} props - Propiedades para la validación.
	 * @param {Primitives<OperatingSystemId> | null} [props.value] - El valor del ID del sistema operativo.
	 * @param {Primitives<StatusId>} [props.status] - El ID del estado del dispositivo.
	 * @param {Primitives<ComputerHDDCapacity>} [props.hardDriveCapacity] - La capacidad del disco duro asociada.
	 * @returns {boolean} `true` si el sistema operativo es válido, `false` en caso contrario.
	 */ public static isValid({
		value,
		status,
		hardDriveCapacity
	}: {
		value?: Primitives<OperatingSystemId> | null
		status?: Primitives<StatusId>
		hardDriveCapacity?: Primitives<ComputerHDDCapacity>
	}): boolean {
		ComputerOs.updateError('')
		if (!status) return true
		switch (status) {
			// Si el equipo esta en uso, a prestamo, contingencia o de guardia el sistema es obligatorio
			case StatusOptions.INUSE:
			case StatusOptions.PRESTAMO:
			case StatusOptions.CONTINGENCIA:
			case StatusOptions.JORNADA:
			case StatusOptions.GUARDIA:
				if (!value) {
					ComputerOs.updateError(
						'Si el equipo está en uso, el sistema operativo es requerido.'
					)
					return false
				}
				break
			// Si el equipo esta no esta en usuo, desincorporado, en almacen o por desincorporar el sistema no es requerido
			case StatusOptions.PORDESINCORPORAR:
			case StatusOptions.DESINCORPORADO:
			case StatusOptions.INALMACEN:
				if (value) {
					ComputerOs.updateError(
						'Si el equipo no está en uso, el sistema operativo no es requerido.'
					)
					return false
				}
				break
			default:
				break
		}

		// Si el equipo no posee disco duro o no esta definido no puede tener sistema operativo
		if (!hardDriveCapacity && value) {
			ComputerOs.updateError(
				'El disco duro no tiene capacidad definida, por lo que no se puede asignar un sistema operativo.'
			)
			return false
		}
		return true
	}

	/**
	 * Obtiene el mensaje de error de validación.
	 * @static
	 * @returns {string} El mensaje de error.
	 */ public static invalidMessage(): string {
		return ComputerOs.errorsValue
	}
}
