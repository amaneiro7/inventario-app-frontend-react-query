import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { EmployeeType, EmployeeTypes } from './EmployeeType'
import { AcceptedNullValueObject } from '@/core/shared/domain/value-objects/AcceptedNullValueObject'

export class EmployeeEmail extends AcceptedNullValueObject<string> {
	static readonly regex =
		/^(?=.*[@](?:bnc\.com\.ve)$)[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[a-zA-Z0-9_-]*$/

	private static error = ''

	constructor(value: string | null, type: Primitives<EmployeeType>) {
		super(value)
		if (!EmployeeEmail.isValid({ value, type })) {
			throw new Error(EmployeeEmail.invalidMessage())
		}
	}

	public static isValid({
		value,
		type
	}: {
		value?: Primitives<EmployeeEmail>
		type?: Primitives<EmployeeType>
	}): boolean {
		// El correo electronico es opcional, si no se envia se asume que es valido
		// si es generico no puede tener un correo
		EmployeeEmail.error = ''
		if (!value || !type) {
			// si no tiene un correo y no hay validación específica, es valido
			return true
		}

		if (type === EmployeeTypes.GENERIC && value) {
			EmployeeEmail.error = 'Si es genérico no puede tener un correo electrónico.'
			return false
		}

		if (!EmployeeEmail.regex.test(value)) {
			EmployeeEmail.error = 'No es un formato de correo electrónico válido.'
			return false
		}
		return true
	}

	public static invalidMessage(): string {
		return EmployeeEmail.error
	}
}
