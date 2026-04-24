import { AcceptedNullValueObject } from '@/entities/shared/domain/value-objects/AcceptedNullValueObject'
import { InvalidArgumentError } from '@/entities/shared/domain/value-objects/InvalidArgumentError'
import type { Primitives } from '@/entities/shared/domain/value-objects/Primitives'

export enum AgencyClassificationEnum {
	A = 'A',
	B = 'B',
	C = 'C',
	D = 'D',
	E = 'E'
}

export class AgencyClassification extends AcceptedNullValueObject<string> {
	constructor(readonly value: string) {
		super(value)
		this.ensureIsValidAgencyClassification(value)
	}

	private ensureIsValidAgencyClassification(value: Primitives<AgencyClassification>): void {
		if (value === null) {
			return
		}
		if (!Object.values(AgencyClassificationEnum).includes(value as AgencyClassificationEnum)) {
			throw new InvalidArgumentError(`<${value}> no es una clasificación de agencia válida.`)
		}
	}
}
