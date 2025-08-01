import { AcceptedNullValueObject } from '@/entities/shared/domain/value-objects/AcceptedNullValueObject'
import { type Nullable } from '@/entities/shared/domain/value-objects/Nullable'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type EmployeeType, EmployeeTypes } from './EmployeeType'

export class EmployeeLastName extends AcceptedNullValueObject<string> {
	static readonly NAME_MIN_LENGTH = 3
	static readonly NAME_MAX_LENGTH = 100
	static readonly regex = /^[A-ZÑñÁÉÍÓÚ][a-zñáéíóú]*(?: [A-ZÑñÁÉÍÓÚ][a-zñáéíóú]*)*$/

	private static error = ''

	constructor(value: string | null, type: Primitives<EmployeeType>) {
		super(value)
		if (!EmployeeLastName.isValid({ value, type })) {
			throw new Error(EmployeeLastName.invalidMessage())
		}
	}

	public static isValid({
		value,
		type
	}: {
		value: Nullable<Primitives<EmployeeLastName>>
		type: Primitives<EmployeeType>
	}): boolean {
		const errors: string[] = []

		if (type !== EmployeeTypes.GENERIC && !value) {
			errors.push('El apellido es obligatorio.')
		}

		if (value) {
			const validFormat = EmployeeLastName.regex.test(value)
			if (!validFormat) {
				errors.push(
					'La primera letra debe ser en mayúsculas, el resto en minúsculas, y no puede tener espacios al final al menos que sea un nombre compuesto.'
				)
			}
			const validLength =
				value.length >= EmployeeLastName.NAME_MIN_LENGTH &&
				value.length <= EmployeeLastName.NAME_MAX_LENGTH
			if (!validLength) {
				errors.push(
					`El nombre debe tener entre ${EmployeeLastName.NAME_MIN_LENGTH} y ${EmployeeLastName.NAME_MAX_LENGTH} caracteres.`
				)
			}
		}
		if (errors.length === 0) {
			return true
		} else {
			EmployeeLastName.error = errors.join(' ')
			return false
		}
	}

	public static invalidMessage(): string {
		return EmployeeLastName.error
	}
}
