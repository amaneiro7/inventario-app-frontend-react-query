import { StringValueObject } from '@/core/shared/domain/value-objects/StringValueObjects'

export class EmployeeEmail extends StringValueObject {
	static readonly regex =
		/^(?=.*[@](?:bnc\.com\.ve)$)[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[a-zA-Z0-9_-]*$/

	private static error = ''

	constructor(value: string) {
		super(value)
		if (!EmployeeEmail.isValid(value)) {
			throw new Error(EmployeeEmail.invalidMessage())
		}
	}

	public static isValid(value: string): boolean {
		const errors: string[] = []
		const validFormat = EmployeeEmail.regex.test(value)
		if (!validFormat) {
			errors.push('No es un formato de correo electrónico válido.')
		}
		if (validFormat) {
			return true
		} else {
			EmployeeEmail.error = errors.join(' ')
			return false
		}
	}

	public static invalidMessage(): string {
		return EmployeeEmail.error
	}
}
