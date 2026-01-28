import { StringValueObject } from '@/entities/shared/domain/value-objects/StringValueObjects'

/**
 * Represents a user's email address as a Value Object.
 * It extends StringValueObject and enforces a specific email format.
 */
export class UserEmail extends StringValueObject {
	/**
	 * Regular expression for validating user email addresses.
	 * It specifically checks for emails ending with '@bnc.com.ve' or '@banconacionaldecredito.com.ve'.
	 */
	static readonly validEmailRegExp =
		/^(?=.*[@](?:bnc\.com\.ve|banconacionaldecredito\.com\.ve)$)[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[a-zA-Z0-9_-]*$/

	/**
	 * Constructs a UserEmail Value Object.
	 * @param value - The string value of the email address.
	 * @throws Error if the provided value does not meet the validation criteria.
	 */
	constructor(value: string) {
		super(value)
		if (!UserEmail.isValid(value)) {
			throw new Error(UserEmail.invalidMessage(value))
		}
	}

	/**
	 * Validates the given string value against the `validEmailRegExp`.
	 * @param value - The string to validate.
	 * @returns True if the value is a valid email address, false otherwise.
	 */
	public static isValid(value: string): boolean {
		return UserEmail.validEmailRegExp.test(value)
	}

	/**
	 * Returns a validation error message for an invalid email address.
	 * @param value - The invalid string value.
	 * @returns The error message string.
	 */
	public static invalidMessage(value: string): string {
		return `El email ${value} no es válido.`
	}
}
