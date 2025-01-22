import { NumberValueObject } from '@/core/shared/domain/value-objects/NumberValueObject'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'

export class MemoryRamSlotQuantity extends NumberValueObject {
	static readonly MIN = 1
	static readonly MAX = 8
	static readonly STEPS = 2

	constructor(value: number) {
		super(value)
		if (!MemoryRamSlotQuantity.isValid(value)) {
			throw new Error(MemoryRamSlotQuantity.invalidMessage())
		}
	}

	public static isValid(value: Primitives<MemoryRamSlotQuantity>): boolean {
		const parseValue = Number(value)
		if (parseValue === MemoryRamSlotQuantity.MIN) return true
		if (
			parseValue < MemoryRamSlotQuantity.MIN &&
			parseValue > MemoryRamSlotQuantity.MAX
		)
			return false
		if (parseValue % 2 !== 0) return false
		return true
	}

	public static invalidMessage(): string {
		return `El valor Debe estar entre ${MemoryRamSlotQuantity.MIN} y ${MemoryRamSlotQuantity.MAX} y ser par o ser 1`
	}
}
