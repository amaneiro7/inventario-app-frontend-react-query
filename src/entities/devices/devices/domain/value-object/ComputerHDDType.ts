import { AcceptedNullValueObject } from '@/entities/shared/domain/value-objects/AcceptedNullValueObject'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type HardDriveTypeId } from '@/entities/devices/features/hardDrive/hardDriveType/domain/value-object/HardDriveTypeId'
import { type ComputerHDDCapacity } from './ComputerHDDCapacity'

export class ComputerHDDType extends AcceptedNullValueObject<Primitives<HardDriveTypeId>> {
	private static errors = ''
	constructor(
		value: Primitives<HardDriveTypeId> | null,
		private readonly hardDriveCapacity: Primitives<ComputerHDDCapacity>
	) {
		super(value)

		if (
			!ComputerHDDType.isValid({
				value: this.value,
				hardDriveCapacity: this.hardDriveCapacity
			})
		) {
			throw new Error(ComputerHDDType.invalidMessage())
		}
	}

	private static updateError(error: string): void {
		ComputerHDDType.errors = error
	}

	private static get errorsValue(): string {
		return ComputerHDDType.errors
	}

	public static isValid({
		value,
		hardDriveCapacity
	}: {
		value: Primitives<ComputerHDDType>
		hardDriveCapacity?: Primitives<ComputerHDDCapacity>
	}): boolean {
		ComputerHDDType.updateError('')
		if (!hardDriveCapacity && value) {
			ComputerHDDType.updateError('Si no tiene Disco duro, no se puede especificar un tipo.')
			return false
		}
		return true
	}

	public static invalidMessage(): string {
		return ComputerHDDType.errorsValue
	}
}
