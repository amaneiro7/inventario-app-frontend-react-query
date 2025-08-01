import { InvalidArgumentError } from '@/entities/shared/domain/value-objects/InvalidArgumentError'
import { StringValueObject } from '@/entities/shared/domain/value-objects/StringValueObjects'
import { codigosAreaVenezuela } from './codigosAreaVenezuela'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'

export class EmployeeExtension extends StringValueObject {
	private static readonly areaCodes = codigosAreaVenezuela.map(areaCode => areaCode.codigo)
	private static readonly numberLenght = 7
	private static readonly extension = `^(${this.areaCodes.join('|')})\\d{${this.numberLenght}}$`
	private static readonly phoneRegex = new RegExp(this.extension)
	private static error = ''

	constructor(value: string) {
		super(value)

		if (!EmployeeExtension.isValid(value)) {
			throw new InvalidArgumentError(EmployeeExtension.invalidMessage())
		}
	}

	public static fromValues(extensions: Primitives<EmployeeExtension>[]): EmployeeExtension[] {
		return extensions.filter(Boolean).map(extension => new EmployeeExtension(extension)) ?? []
	}
	public static isValid(value: string): boolean {
		const validFormat = this.phoneRegex.test(value)
		if (!validFormat) {
			EmployeeExtension.error = `${value} no es un número de teléfono válido.`
			return false
		}

		return true
	}

	public static invalidMessage(): string {
		return EmployeeExtension.error
	}
}
