import { AcceptedNullValueObject } from '@/core/shared/domain/value-objects/AcceptedNullValueObject'
import { StatusOptions } from '@/core/status/domain/entity/StatusOptions'
import { type HardDriveCapacityId } from '@/core/devices/features/hardDrive/hardDriveCapacity/domain/value-object/HardDriveCapacityId'
import { type OperatingSystemId } from '@/core/devices/features/operatingSystem/operatingSystem/domain/value-object/OperatingSystemId'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'

export class ComputerOs extends AcceptedNullValueObject<
	Primitives<OperatingSystemId>
> {
	private static errors = ''
	constructor(
		value: Primitives<OperatingSystemId>,
		private readonly status: (typeof StatusOptions)[keyof typeof StatusOptions],
		private readonly hardDriveCapacity: Primitives<HardDriveCapacityId>
	) {
		super(value)

		if (
			!ComputerOs.isValid(this.value, this.status, this.hardDriveCapacity)
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

	public static isValid(
		value: Primitives<ComputerOs>,
		status: (typeof StatusOptions)[keyof typeof StatusOptions],
		hardDriveCapacity: Primitives<HardDriveCapacityId>
	): boolean {
		// Si el equipo esta en uso, a prestamo, contingencia o de guardia el sistema es obligatorio
		const allowedStatusOptions = [
			StatusOptions.INUSE,
			StatusOptions.PRESTAMO,
			StatusOptions.CONTINGENCIA,
			StatusOptions.GUARDIA
		] as (typeof StatusOptions)[keyof typeof StatusOptions][]
		if (allowedStatusOptions.includes(status) && !value) {
			ComputerOs.updateError(
				'Si el equipo está en uso, el sistema operativo es requerido.'
			)
			return false
		}
		// Si el equipo esta no esta en usuo, desincorporado, en almacen o por desincorporar el sistema no es requerido
		const notAllowedStausOptions = [
			StatusOptions.PORDESINCORPORAR,
			StatusOptions.DESINCORPORADO,
			StatusOptions.INALMACEN
		] as (typeof StatusOptions)[keyof typeof StatusOptions][]
		if (notAllowedStausOptions.includes(status) && value) {
			ComputerOs.updateError(
				'Si el equipo no está en uso, el sistema operativo no es requerido.'
			)
			return false
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
