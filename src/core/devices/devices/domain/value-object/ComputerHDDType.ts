import { AcceptedNullValueObject } from '@/core/shared/domain/value-objects/AcceptedNullValueObject'
import { type HardDriveCapacityId } from '@/core/devices/features/hardDrive/hardDriveCapacity/domain/value-object/HardDriveCapacityId'
import { type HardDriveTypeId } from '@/core/devices/features/hardDrive/hardDriveType/domain/value-object/HardDriveTypeId'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'

export class ComputerHDDType extends AcceptedNullValueObject<Primitives<HardDriveTypeId>> {
	private static errors = ''
	constructor(
		value: Primitives<HardDriveTypeId> | null,
		private readonly hardDriveCapacity: Primitives<HardDriveCapacityId> | null
	) {
		super(value)

		if (!ComputerHDDType.isValid(this.value, this.hardDriveCapacity)) {
			throw new Error(ComputerHDDType.invalidMessage())
		}
	}

	private static updateError(error: string): void {
		ComputerHDDType.errors = error
	}

	private static get errorsValue(): string {
		return ComputerHDDType.errors
	}

	public static isValid(
		value: Primitives<ComputerHDDType>,
		hardDriveCapacity: Primitives<HardDriveCapacityId> | null
	): boolean {
		if (!hardDriveCapacity && value) {
			ComputerHDDType.updateError('Si no tiene Disco duro, no se puede especificar un tipo')
			return false
		}
		return true
	}

	public static invalidMessage(): string {
		return ComputerHDDType.errorsValue
	}
}
