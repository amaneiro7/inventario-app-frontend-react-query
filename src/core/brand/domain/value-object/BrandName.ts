import { StringValueObject } from '@/core/shared/domain/value-objects/StringValueObjects'

export class BrandName extends StringValueObject {
	static readonly NAME_MIN_LENGTH = 2
	static readonly NAME_MAX_LENGTH = 100

	constructor(value: string) {
		super(value)
		if (!BrandName.isValid(value)) {
			throw new Error(BrandName.invalidMessage(value))
		}
	}

	public static isValid(value: string): boolean {
		return (
			value.length >= BrandName.NAME_MIN_LENGTH && value.length <= BrandName.NAME_MAX_LENGTH
		)
	}

	public static invalidMessage(value: string): string {
		return `El nombre ${value} no es válido. Debe tener entre ${BrandName.NAME_MIN_LENGTH} y ${BrandName.NAME_MAX_LENGTH} caracteres`
	}
}
