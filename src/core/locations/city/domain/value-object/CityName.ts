import { StringValueObject } from '@/core/shared/domain/value-objects/StringValueObjects'

export class CityName extends StringValueObject {
	static readonly NAME_MIN_LENGTH = 2
	static readonly NAME_MAX_LENGTH = 100

	constructor(value: string) {
		super(value)
		if (!CityName.isValid(value)) {
			throw new Error(CityName.invalidMessage(value))
		}
	}

	public static isValid(value: string): boolean {
		return value.length >= CityName.NAME_MIN_LENGTH && value.length <= CityName.NAME_MAX_LENGTH
	}

	public static invalidMessage(value: string): string {
		return `El nombre ${value} no es válido. Debe tener entre ${CityName.NAME_MIN_LENGTH} y ${CityName.NAME_MAX_LENGTH} caracteres`
	}
}
