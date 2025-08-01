import { AcceptedNullValueObject } from '@/entities/shared/domain/value-objects/AcceptedNullValueObject'
import { StatusOptions } from '@/entities/status/status/domain/entity/StatusOptions'
import { type OperatingSystemId } from '@/entities/devices/features/operatingSystem/operatingSystem/domain/value-object/OperatingSystemId'
import { type ProcessorId } from '@/entities/devices/features/processor/domain/value-object/ProcessorId'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type StatusId } from '@/entities/status/status/domain/value-object/StatusId'

export class ComputerProcessor extends AcceptedNullValueObject<Primitives<ProcessorId>> {
	private static errors = ''
	constructor(
		value: Primitives<OperatingSystemId> | null,
		private readonly status: Primitives<StatusId>
	) {
		super(value)

		if (!ComputerProcessor.isValid({ value: this.value, status: this.status })) {
			throw new Error(ComputerProcessor.invalidMessage())
		}
	}

	private static updateError(error: string): void {
		ComputerProcessor.errors = error
	}

	private static get errorsValue(): string {
		return ComputerProcessor.errors
	}

	public static isValid({
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

	public static invalidMessage(): string {
		return ComputerProcessor.errorsValue
	}
}
