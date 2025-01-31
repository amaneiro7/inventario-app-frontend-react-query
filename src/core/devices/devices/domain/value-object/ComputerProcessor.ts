import { AcceptedNullValueObject } from '@/core/shared/domain/value-objects/AcceptedNullValueObject'
import { StatusOptions } from '@/core/status/domain/entity/StatusOptions'
import { type OperatingSystemId } from '@/core/devices/features/operatingSystem/operatingSystem/domain/value-object/OperatingSystemId'
import { type ProcessorId } from '@/core/devices/features/processor/domain/value-object/ProcessorId'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'

export class ComputerProcessor extends AcceptedNullValueObject<Primitives<ProcessorId>> {
	private static errors = ''
	constructor(
		value: Primitives<OperatingSystemId> | null,
		private readonly status: (typeof StatusOptions)[keyof typeof StatusOptions]
	) {
		super(value)

		if (!ComputerProcessor.isValid(this.value, this.status)) {
			throw new Error(ComputerProcessor.invalidMessage())
		}
	}

	private static updateError(error: string): void {
		ComputerProcessor.errors = error
	}

	private static get errorsValue(): string {
		return ComputerProcessor.errors
	}

	public static isValid(
		value: Primitives<ComputerProcessor>,
		status: (typeof StatusOptions)[keyof typeof StatusOptions]
	): boolean {
		const allowedStatusOptions = [
			StatusOptions.INUSE,
			StatusOptions.INALMACEN,
			StatusOptions.PRESTAMO,
			StatusOptions.GUARDIA,
			StatusOptions.CONTINGENCIA
		] as (typeof StatusOptions)[keyof typeof StatusOptions][]
		if (allowedStatusOptions.includes(status) && !value) {
			ComputerProcessor.updateError('Si esta en uso o en almacén, el procesador es requerido')
			return false
		}
		return true
	}

	public static invalidMessage(): string {
		return ComputerProcessor.errorsValue
	}
}
