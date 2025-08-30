import { InvalidArgumentError } from '@/entities/shared/domain/value-objects/InvalidArgumentError'
import { StringValueObject } from '@/entities/shared/domain/value-objects/StringValueObjects'

export enum StatusEnum {
	PENDING = 'pendiente',
	IN_TRANSIT = 'en_transito',
	DELIVERED = 'entregado',
	CANCELLED = 'cancelado'
}

export class ShipmentStatus extends StringValueObject {
	constructor(readonly value: string) {
		super(value)
		this.ensureIsValidStatus(value)
	}

	private ensureIsValidStatus(status: string): void {
		if (!Object.values(StatusEnum).includes(status as StatusEnum)) {
			throw new InvalidArgumentError(`<${status}> no es un estado de envío válido.`)
		}
	}
}
