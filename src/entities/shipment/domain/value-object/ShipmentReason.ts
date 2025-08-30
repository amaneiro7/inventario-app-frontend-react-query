import { InvalidArgumentError } from '@/entities/shared/domain/value-objects/InvalidArgumentError'
import { StringValueObject } from '@/entities/shared/domain/value-objects/StringValueObjects'

export enum ReasonEnum {
	NEW_ASSIGNMENT = 'nueva_asignacion',
	REPAIR = 'reparacion',
	RETURN = 'devolucion',
	TRANSFER = 'traslado',
	DISPOSAL = 'desincorporacion',
	OTHER = 'otro'
}

export class ShipmentReason extends StringValueObject {
	constructor(readonly value: string) {
		super(value)
		this.ensureIsValidReason(value)
	}

	private ensureIsValidReason(reason: string): void {
		if (!Object.values(ReasonEnum).includes(reason as ReasonEnum)) {
			throw new InvalidArgumentError(`<${reason}> no es un motivo de envío válido.`)
		}
	}
}
