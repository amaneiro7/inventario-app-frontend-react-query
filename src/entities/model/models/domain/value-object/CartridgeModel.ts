import { StringValueObject } from '@/entities/shared/domain/value-objects/StringValueObjects'

export class CartridgeModel extends StringValueObject {
	static readonly MIN = 3
	static readonly MAX = 20

	constructor(value: string) {
		super(value)
		if (!CartridgeModel.isValid(value)) {
			throw new Error(CartridgeModel.invalidMessage())
		}
	}

	static isValid(value: string): boolean {
		return value.length >= this.MIN && value.length <= this.MAX
	}

	static invalidMessage(): string {
		return `El modelo del cartucho no es válido. Debe tener entre ${this.MIN} y ${this.MAX} caracteres.`
	}
}
