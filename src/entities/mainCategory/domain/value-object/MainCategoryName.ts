import { StringValueObject } from '@/entities/shared/domain/value-objects/StringValueObjects'

export class MainCategoryName extends StringValueObject {
	static readonly NAME_MIN_LENGTH = 2
	static readonly NAME_MAX_LENGTH = 100

	constructor(value: string) {
		super(value)
		if (!MainCategoryName.isValid(value)) {
			throw new Error(MainCategoryName.invalidMessage(value))
		}
	}

	public static isValid(value: string): boolean {
		return (
			value.length >= MainCategoryName.NAME_MIN_LENGTH &&
			value.length <= MainCategoryName.NAME_MAX_LENGTH
		)
	}

	public static invalidMessage(value: string): string {
		return `El nombre ${value} no es válido. Debe tener entre ${MainCategoryName.NAME_MIN_LENGTH} y ${MainCategoryName.NAME_MAX_LENGTH} caracteres`
	}
}
