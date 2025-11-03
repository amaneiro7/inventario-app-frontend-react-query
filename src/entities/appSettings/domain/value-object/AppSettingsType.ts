import { EnumValueObject } from '@/entities/shared/domain/value-objects/EnumValueObject'
import { InvalidArgumentError } from '@/entities/shared/domain/value-objects/InvalidArgumentError'

export enum SettingsTypeEnum {
	STRING = 'string',
	NUMBER = 'number',
	BOOLEAN = 'boolean',
	JSON = 'json'
}

export class AppSettingsType extends EnumValueObject<SettingsTypeEnum> {
	constructor(value: SettingsTypeEnum) {
		super(value, Object.values(SettingsTypeEnum))
	}

	protected throwErrorForInvalidValue(value: SettingsTypeEnum): void {
		throw new InvalidArgumentError(`'${value}' is not a valid setting type.`)
	}
}
