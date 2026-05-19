import { NumberValueObject } from '@/entities/shared/domain/value-objects/NumberValueObject'

export class Level extends NumberValueObject {
	static readonly MIN_LEVEL = 1
	static readonly MAX_LEVEL = 8
	constructor(value: number) {
		super(value)
		if (!Level.isValid(value)) {
			throw new Error(Level.invalidMessage())
		}
	}

	public static isValid(value: number): boolean {
		return value >= Level.MIN_LEVEL && value <= Level.MAX_LEVEL
	}

	public static invalidMessage(): string {
		return 'El nivel debe estar entre 1 y 8'
	}
}
