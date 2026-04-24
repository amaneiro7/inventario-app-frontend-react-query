import { StringValueObject } from '@/entities/shared/domain/value-objects/StringValueObjects'

export class ISPLinkName extends StringValueObject {
	static readonly NAME_MIN_LENGTH = 2
	static readonly NAME_MAX_LENGTH = 100

	constructor(value: string) {
		super(value)
		if (!ISPLinkName.isValid(value)) {
			throw new Error(ISPLinkName.invalidMessage(value))
		}
	}

	public static isValid(value: string): boolean {
		return (
			value.length >= ISPLinkName.NAME_MIN_LENGTH &&
			value.length <= ISPLinkName.NAME_MAX_LENGTH
		)
	}

	public static invalidMessage(value: string): string {
		return `El nombre ${value} no es válido. Debe tener entre ${ISPLinkName.NAME_MIN_LENGTH} y ${ISPLinkName.NAME_MAX_LENGTH} caracteres`
	}
}
