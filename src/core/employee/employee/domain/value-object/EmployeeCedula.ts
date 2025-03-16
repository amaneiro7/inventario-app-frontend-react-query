import { NumberValueObject } from '@/core/shared/domain/value-objects/NumberValueObject'
import { InvalidArgumentError } from '@/core/shared/domain/value-objects/InvalidArgumentError'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type Nullable } from '@/core/shared/domain/value-objects/Nullable'
import { type EmployeeType, EmployeeTypes } from './EmployeeType'

export class EmployeeCedula extends NumberValueObject {
	static readonly MAX = 200000000
	static readonly MIN = 1
	private static error = ''

	/**
	 * Constructor de la clase EmployeeCedula
	 * @param value el valor de la cédula, debe ser un número entre 1 y 200000000
	 * @param type el tipo del empleado, si es genérico no se puede tener una cédula
	 * @throws InvalidArgumentError si el valor no es válido
	 */
	constructor(value: number | null | undefined, type: Primitives<EmployeeType>) {
		if (!value) {
			if (type !== EmployeeTypes.GENERIC) {
				throw new InvalidArgumentError('La cédula es obligatoria.')
			}
			super(null)
		} else {
			super(value)
			if (!EmployeeCedula.isValid({ value, type })) {
				throw new InvalidArgumentError(EmployeeCedula.invalidMessage())
			}
		}
	}

	public static isValid({
		value,
		type
	}: {
		value?: Nullable<Primitives<EmployeeCedula>> | ''
		type?: Primitives<EmployeeType>
	}): boolean {
		EmployeeCedula.error = ''
		if (type === EmployeeTypes.GENERIC) {
			if (value) {
				EmployeeCedula.error = 'Si es genérico no puede tener un cédula.'
				return false
			}
			return true
		}
		if (!value) {
			EmployeeCedula.error = 'La cédula es obligatoria.'
			return false
		}

		if (typeof value !== 'number') {
			EmployeeCedula.error = 'La cédula debe ser numérico.'
			return false
		}
		const validLength = value >= EmployeeCedula.MIN && value <= EmployeeCedula.MAX
		if (!validLength) {
			EmployeeCedula.error = `${value} no es un número de cécula válido. Debe estar entre ${EmployeeCedula.MIN} y ${EmployeeCedula.MAX}`
			return false
		}
		return true
	}

	public static invalidMessage(): string {
		return EmployeeCedula.error
	}
}
