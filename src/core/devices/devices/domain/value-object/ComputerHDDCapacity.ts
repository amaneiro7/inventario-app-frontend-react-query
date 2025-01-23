import { type HardDriveCapacityId } from '@/core/devices/features/hardDrive/hardDriveCapacity/domain/value-object/HardDriveCapacityId'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { AcceptedNullValueObject } from '@/core/shared/domain/value-objects/AcceptedNullValueObject'
import { StatusOptions } from '@/core/status/domain/entity/StatusOptions'

export class ComputerHDDCapacity extends AcceptedNullValueObject<
	Primitives<HardDriveCapacityId>
> {
	private static errors = ''
	constructor(
		value: Primitives<HardDriveCapacityId> | null,
		private readonly status: (typeof StatusOptions)[keyof typeof StatusOptions]
	) {
		super(value)

		if (!ComputerHDDCapacity.isValid(this.value, this.status)) {
			throw new Error(ComputerHDDCapacity.invalidMessage())
		}
	}

	private static updateError(error: string): void {
		ComputerHDDCapacity.errors = error
	}

	private static get errorsValue(): string {
		return ComputerHDDCapacity.errors
	}

	public static isValid(
		value: Primitives<ComputerHDDCapacity>,
		status: (typeof StatusOptions)[keyof typeof StatusOptions]
	): boolean {
		const allowedStatusOptions = [
			StatusOptions.INUSE,
			StatusOptions.PRESTAMO,
			StatusOptions.CONTINGENCIA,
			StatusOptions.GUARDIA
		] as (typeof StatusOptions)[keyof typeof StatusOptions][]
		if (allowedStatusOptions.includes(status) && !value) {
			ComputerHDDCapacity.updateError(
				'Si el equipo está en uso, no se puede dejar en blanco la capacidad del Disco Duro'
			)
			return false
		}
		return true
	}

	public static invalidMessage(): string {
		return ComputerHDDCapacity.errorsValue
	}
}
