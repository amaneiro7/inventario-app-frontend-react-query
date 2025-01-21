import { EnumValueObject } from '@/core/shared/domain/value-objects/EnumValueObject'
import { InvalidArgumentError } from '@/core/shared/domain/value-objects/InvalidArgumentError'

export enum EmployeeTypes {
	GENERIC = 'generic',
	REGULAR = 'regular',
	SERVICE = 'service'
}

export class EmployeeType extends EnumValueObject<EmployeeTypes> {
	constructor(value: EmployeeTypes) {
		super(value, Object.values(EmployeeTypes))
	}

	protected throwErrorForInvalidValue(value: EmployeeTypes): void {
		throw new InvalidArgumentError(`Invalid employee type: ${value}`)
	}
}
