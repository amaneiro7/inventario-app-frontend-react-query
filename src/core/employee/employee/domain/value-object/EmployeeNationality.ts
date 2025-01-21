import { EnumValueObject } from '@/core/shared/domain/value-objects/EnumValueObject'
import { InvalidArgumentError } from '@/core/shared/domain/value-objects/InvalidArgumentError'

export enum Nationalities {
	V = 'V',
	E = 'E'
}

export class EmployeeNationality extends EnumValueObject<Nationalities> {
	constructor(value: Nationalities) {
		super(value, Object.values(Nationalities))
	}

	protected throwErrorForInvalidValue(value: Nationalities): void {
		throw new InvalidArgumentError(`Invalid nationality: ${value}`)
	}
}
