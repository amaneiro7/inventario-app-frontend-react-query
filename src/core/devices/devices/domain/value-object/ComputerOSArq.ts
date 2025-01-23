import { AcceptedNullValueObject } from '@/core/shared/domain/value-objects/AcceptedNullValueObject'
import { type OperatingSystemId } from '@/core/devices/features/operatingSystem/operatingSystem/domain/value-object/OperatingSystemId'
import { type OperatingSystemArqId } from '@/core/devices/features/operatingSystem/operatingSystemArq/domain/value-object/OperatingSystemArqId'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'

export class ComputerOsArq extends AcceptedNullValueObject<
	Primitives<OperatingSystemArqId>
> {
	private static errors = ''
	constructor(
		value: Primitives<OperatingSystemId> | null,
		private readonly operatingSystem: Primitives<OperatingSystemId> | null
	) {
		super(value)

		if (!ComputerOsArq.isValid(this.value, this.operatingSystem)) {
			throw new Error(ComputerOsArq.invalidMessage())
		}
	}

	private static updateError(error: string): void {
		ComputerOsArq.errors = error
	}

	private static get errorsValue(): string {
		return ComputerOsArq.errors
	}

	public static isValid(
		value: Primitives<ComputerOsArq>,
		operatingSystem: Primitives<OperatingSystemId> | null
	): boolean {
		if (!operatingSystem && value) {
			ComputerOsArq.updateError(
				'Si el equipo no posee Sistema Operativo, no se le puede definir una arquitectura'
			)
			return false
		}
		if (operatingSystem && !value) {
			ComputerOsArq.updateError(
				'Si el equipo posee Sistema Operativo, la arquitectura es requerida'
			)
			return false
		}
		return true
	}

	public static invalidMessage(): string {
		return ComputerOsArq.errorsValue
	}
}
