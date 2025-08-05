import { StringValueObject } from '@/entities/shared/domain/value-objects/StringValueObjects'

/**
 * Represents the name of a MainCategory as a Value Object.
 * It extends StringValueObject and enforces specific length rules.
 */
export class MainCategoryName extends StringValueObject {
	static readonly NAME_MIN_LENGTH = 2
	static readonly NAME_MAX_LENGTH = 100

	/**
	 * Constructs a MainCategoryName Value Object.
	 * @param value - The string value of the main category name.
	 * @throws Error if the provided value does not meet the validation criteria.
	 */
	constructor(value: string) {
		super(value)
		if (!MainCategoryName.isValid(value)) {
			throw new Error(MainCategoryName.invalidMessage(value))
		}
	}

	/**
	 * Validates the given string value against predefined length rules for a main category name.
	 * @param value - The string to validate.
	 * @returns True if the value is valid, false otherwise.
	 */
	public static isValid(value: string): boolean {
		return (
			value.length >= MainCategoryName.NAME_MIN_LENGTH &&
			value.length <= MainCategoryName.NAME_MAX_LENGTH
		)
	}

	/**
	 * Returns a validation error message for an invalid main category name.
	 * @param value - The invalid string value.
	 * @returns The error message string.
	 */
	public static invalidMessage(value: string): string {
		return `El nombre ${value} no es válido. Debe tener entre ${MainCategoryName.NAME_MIN_LENGTH} y ${MainCategoryName.NAME_MAX_LENGTH} caracteres`
	}
}