import { AcceptedNullValueObject } from '@/entities/shared/domain/value-objects/AcceptedNullValueObject'
import { InvalidArgumentError } from '@/entities/shared/domain/value-objects/InvalidArgumentError'
import { type EmployeeType, EmployeeTypes } from './EmployeeType'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'

export enum Nationalities {
	V = 'V',
	E = 'E'
}

interface EmployeeNationalityProps {
	value: Nationalities | null
	type: Primitives<EmployeeType>
}

export class EmployeeNationality extends AcceptedNullValueObject<Nationalities> {
	private static error = ''
	constructor(
		value: Nationalities | null,
		private readonly type: Primitives<EmployeeType>
	) {
		super(value)
		if (!EmployeeNationality.isValid({ value, type: this.type })) {
			throw new Error(EmployeeNationality.invalidMessage())
		}
	}

	public static isValid({ value, type }: EmployeeNationalityProps): boolean {
		if (type !== EmployeeTypes.GENERIC && !value) {
			EmployeeNationality.error = 'La nacionalidad es obligatoria.'
			return false
		}

		if (value !== null && !Object.values(Nationalities).includes(value)) {
			EmployeeNationality.error = `Nacionalidad inválida: ${value}. Las nacionalidades validas son: ${Object.values(
				Nationalities
			).join(', ')}`
			return false
		}

		return true
	}

	public static invalidMessage(): string {
		return EmployeeNationality.error
	}

	protected throwErrorForInvalidValue(value: Nationalities): void {
		throw new InvalidArgumentError(`Invalid nationality: ${value}`)
	}
}
