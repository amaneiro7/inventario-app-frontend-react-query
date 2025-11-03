import { StringValueObject } from '@/entities/shared/domain/value-objects/StringValueObjects'
import { SettingsTypeEnum } from './AppSettingsType'
import { InvalidArgumentError } from '@/entities/shared/domain/value-objects/InvalidArgumentError'

/**
 * Represents the value of an application setting.
 * This value object can handle different data types by validating and converting
 * the input string based on the provided setting type.
 */
export class AppSettingsValue extends StringValueObject {
	/**
	 * Constructs an AppSettingsValue instance.
	 * @param value - The raw string value of the setting.
	 * @param type - The expected data type of the setting.
	 * @throws {InvalidArgumentError} If the value is not valid for the given type.
	 */
	constructor(value: string, type: SettingsTypeEnum) {
		super(value)
		this.ensureIsValid(value, type)
	}

	/**
	 * Ensures the value is valid for the specified type.
	 * @param value - The value to validate.
	 * @param type - The setting type to validate against.
	 * @throws {InvalidArgumentError} If validation fails.
	 */
	private ensureIsValid(value: string, type: SettingsTypeEnum): void {
		switch (type) {
			case SettingsTypeEnum.NUMBER:
				if (isNaN(Number(value))) {
					throw new InvalidArgumentError(`El valor '${value}' no es un número válido.`)
				}
				break
			case SettingsTypeEnum.BOOLEAN: {
				const lowerValue = value.toLowerCase()
				if (!['true', 'false', '1', '0', 't', 'f'].includes(lowerValue)) {
					throw new InvalidArgumentError(`El valor '${value}' no es un booleano válido.`)
				}
				break
			}
			case SettingsTypeEnum.JSON:
				try {
					JSON.parse(value)
				} catch (error) {
					throw new InvalidArgumentError(`El valor '${value}' no es un JSON válido.`)
				}
				break
			case SettingsTypeEnum.STRING:
			default:
				// For string, any non-empty value is acceptable unless other rules are specified.
				break
		}
	}

	/**
	 * Converts the value to its primitive representation (string).
	 * In the frontend, we'll often work with the raw string and convert it on demand.
	 */
	toPrimitives(): string {
		return this.value
	}
}
