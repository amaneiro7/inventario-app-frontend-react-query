import { NumberValueObject } from '@/core/shared/domain/value-objects/NumberValueObject'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'

export class ScreenSize extends NumberValueObject {
	static readonly MIN = 11
	static readonly MAX = 75

	constructor(readonly value: number) {
		super(value)
		if (!ScreenSize.isValid(value)) {
			throw new Error(ScreenSize.invalidMessage())
		}
	}

	public static isValid(value: Primitives<ScreenSize>): boolean {
		const parseValue = Number(value)
		return parseValue >= ScreenSize.MIN && parseValue <= ScreenSize.MAX
	}

	public static invalidMessage(): string {
		return `El valor debe estar entre ${ScreenSize.MIN} y ${ScreenSize.MAX}.`
	}
}
