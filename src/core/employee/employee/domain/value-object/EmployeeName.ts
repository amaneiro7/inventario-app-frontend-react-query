import { AcceptedNullValueObject } from '@/core/shared/domain/value-objects/AcceptedNullValueObject'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { EmployeeType, EmployeeTypes } from './EmployeeType'
import { Nullable } from '@/core/shared/domain/value-objects/Nullable'

export class EmployeeName extends AcceptedNullValueObject<string> {
	static readonly NAME_MIN_LENGTH = 3
	static readonly NAME_MAX_LENGTH = 100
	static readonly regex = /^[A-ZÑñÁÉÍÓÚ][a-zñáéíóú]*(?: [A-ZÑñÁÉÍÓÚ][a-zñáéíóú]*)*$/

	private static error = ''

	constructor(value: string | null, type: Primitives<EmployeeType>) {
		super(value)
		if (!EmployeeName.isValid({ value, type })) {
			throw new Error(EmployeeName.invalidMessage())
		}
	}

	public static isValid({
		value,
		type
	}: {
		value: Nullable<Primitives<EmployeeName>>
		type: Primitives<EmployeeType>
	}): boolean {
		const errors: string[] = []

		switch (type) {
			case EmployeeTypes.GENERIC: {
				if (value) {
					errors.push('Si es generico no puede tener un nombre.')
				}
				break
			}
			case EmployeeTypes.REGULAR:
			case EmployeeTypes.SERVICE: {
				if (!value) {
					errors.push('El nombre es obligatorio.')
					break
				}
				const validFormat = EmployeeName.regex.test(value)
				if (!validFormat) {
					errors.push(
						'La primera letra debe ser en mayúsculas, el resto en minúsculas, y no puede tener espacios al final al menos que sea un nombre compuesto.'
					)
				}
				const validLength =
					value?.length >= EmployeeName.NAME_MIN_LENGTH &&
					value?.length <= EmployeeName.NAME_MAX_LENGTH
				if (!validLength) {
					errors.push(
						`${value} no es un nombre válido. Debe tener entre ${EmployeeName.NAME_MIN_LENGTH} y ${EmployeeName.NAME_MAX_LENGTH} caracteres`
					)
				}
			}
		}
		if (errors.length === 0) {
			return true
		} else {
			EmployeeName.error = errors.join(' ')
			return false
		}
	}

	public static invalidMessage(): string {
		return EmployeeName.error
	}
}
