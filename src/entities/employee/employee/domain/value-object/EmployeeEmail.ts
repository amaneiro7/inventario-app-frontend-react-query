import { AcceptedNullValueObject } from '@/entities/shared/domain/value-objects/AcceptedNullValueObject'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'

export class EmployeeEmail extends AcceptedNullValueObject<string> {
	static readonly regex =
		/^(?=.*[@](?:bnc\.com\.ve)$)[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[a-zA-Z0-9_-]*$/

	private static error = ''

	constructor(value: string | null) {
		super(value)
		if (!EmployeeEmail.isValid({ value })) {
			throw new Error(EmployeeEmail.invalidMessage())
		}
	}

	public static isValid({ value }: { value?: Primitives<EmployeeEmail> }): boolean {
		EmployeeEmail.error = ''

		if (value && !EmployeeEmail.regex.test(value)) {
			EmployeeEmail.error = 'No es un formato de correo electrónico válido.'
			return false
		}
		return true
	}

	public static invalidMessage(): string {
		return EmployeeEmail.error
	}
}
