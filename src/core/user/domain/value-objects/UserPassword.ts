import { StringValueObject } from '@/core/shared/domain/value-objects/StringValueObjects'

export class UserPassword extends StringValueObject {
	static readonly HAS_MIN_LENGTH = 8
	static readonly hasUppercase = /[A-Z]/
	static readonly hasLowercase = /[a-z]/
	static readonly hasNumber = /\d/
	static readonly hasSpecialCharacter = /[!@#$%^&()*.]/

	private static errors = ''

	constructor(value: string) {
		super(value)
		if (!UserPassword.isValid(value)) {
			throw new Error(UserPassword.invalidMessage())
		}
	}

	private static updateErrors(value: string): void {
		UserPassword.errors = value
	}

	static get errorsValue(): string {
		return UserPassword.errors
	}

	public static isValid(value: string): boolean {
		// Create an empty array to store any validation errors
		const errors: string[] = []

		// Check if the password length is less than the minimum required length
		if (value?.length < UserPassword.HAS_MIN_LENGTH) {
			errors.push('La contraseña debe tener al menos 8 caracteres')
		}

		// Check if the password contains at least one uppercase letter
		if (!UserPassword.hasUppercase.test(value)) {
			errors.push('La contraseña debe contener al menos una letra mayúscula.')
		}

		// Check if the password contains at least one lowercase letter
		if (!UserPassword.hasLowercase.test(value)) {
			errors.push('La contraseña debe contener al menos una letra minúscula.')
		}

		// Check if the password contains at least one number
		if (!UserPassword.hasNumber.test(value)) {
			errors.push('La contraseña debe contener al menos un número.')
		}

		// Check if the password contains at least one special character
		if (!UserPassword.hasSpecialCharacter.test(value)) {
			errors.push('La contraseña debe contener al menos un carácter especial.')
		}

		// If there are any validation , throw an InvalidArgumentError with the joined error messages
		if (errors.length > 0) {
			UserPassword.updateErrors(errors.join(' '))
			UserPassword.invalidMessage()
			return false
		} else {
			return true
		}
	}

	public static invalidMessage(): string {
		return UserPassword.errorsValue
	}
}
