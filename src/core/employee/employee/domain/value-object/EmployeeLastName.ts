import { AcceptedNullValueObject } from '@/core/shared/domain/value-objects/AcceptedNullValueObject'
import { Nullable } from '@/core/shared/domain/value-objects/Nullable'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { EmployeeType, EmployeeTypes } from './EmployeeType'

export class EmployeeLastName extends AcceptedNullValueObject<string> {
	static readonly NAME_MIN_LENGTH = 3
	static readonly NAME_MAX_LENGTH = 100
	static readonly regex = /^[A-ZÑñÁÉÍÓÚ][a-zñáéíóú]*(?: [A-ZÑñÁÉÍÓÚ][a-zñáéíóú]*)*$/

	private static error = ''

	constructor(value: string | null, type: Primitives<EmployeeTypes>) {
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

		switch (type) {
			case EmployeeTypes.GENERIC: {
				if (value) {
					errors.push('Si es generico no puede tener un apellido.')
				}
				break
			}
			case EmployeeTypes.REGULAR:
			case EmployeeTypes.SERVICE: {
				if (!value) {
					errors.push('El apellido es obligatorio.')
					break
				}
				const validFormat = EmployeeLastName.regex.test(value)
				if (!validFormat) {
					errors.push(
						'La primera letra debe ser en mayúsculas, el resto en minúsculas, y no puede tener espacios al final al menos que sea un nombre compuesto.'
					)
				}
				const validLength =
					value?.length >= EmployeeLastName.NAME_MIN_LENGTH &&
					value?.length <= EmployeeLastName.NAME_MAX_LENGTH
				if (!validLength) {
					errors.push(
						`${value} no es un nombre válido. Debe tener entre ${EmployeeLastName.NAME_MIN_LENGTH} y ${EmployeeLastName.NAME_MAX_LENGTH} caracteres`
					)
				}
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
