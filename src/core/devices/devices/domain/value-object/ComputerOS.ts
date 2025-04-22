import { AcceptedNullValueObject } from '@/core/shared/domain/value-objects/AcceptedNullValueObject'
import { StatusOptions } from '@/core/status/status/domain/entity/StatusOptions'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type OperatingSystemId } from '@/core/devices/features/operatingSystem/operatingSystem/domain/value-object/OperatingSystemId'
import { type StatusId } from '@/core/status/status/domain/value-object/StatusId'
import { type ComputerHDDCapacity } from './ComputerHDDCapacity'

export class ComputerOs extends AcceptedNullValueObject<Primitives<OperatingSystemId>> {
	private static errors = ''
	constructor(
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

	private static updateError(error: string): void {
		ComputerOs.errors = error
	}

	private static get errorsValue(): string {
		return ComputerOs.errors
	}

	public static isValid({
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

	public static invalidMessage(): string {
		return ComputerOs.errorsValue
	}
}
