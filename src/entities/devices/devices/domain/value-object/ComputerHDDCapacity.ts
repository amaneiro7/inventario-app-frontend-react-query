import { AcceptedNullValueObject } from '@/entities/shared/domain/value-objects/AcceptedNullValueObject'
import { StatusOptions } from '@/entities/status/status/domain/entity/StatusOptions'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type HardDriveCapacityId } from '@/entities/devices/features/hardDrive/hardDriveCapacity/domain/value-object/HardDriveCapacityId'
import { type StatusId } from '@/entities/status/status/domain/value-object/StatusId'

export class ComputerHDDCapacity extends AcceptedNullValueObject<Primitives<HardDriveCapacityId>> {
	private static errors = ''
	constructor(
		value: Primitives<HardDriveCapacityId> | null,
		private readonly status: Primitives<StatusId>
	) {
		super(value)

		if (!ComputerHDDCapacity.isValid({ value: this.value, status: this.status })) {
			throw new Error(ComputerHDDCapacity.invalidMessage())
		}
	}

	private static updateError(error: string): void {
		ComputerHDDCapacity.errors = error
	}

	private static get errorsValue(): string {
		return ComputerHDDCapacity.errors
	}

	public static isValid({
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

	public static invalidMessage(): string {
		return ComputerHDDCapacity.errorsValue
	}
}
