import { ValueObject } from './ValueObject'

export abstract class NumberValueObject extends ValueObject<number> {
	constructor(value: number) {
		const numercicValue = Number(value)
		if (isNaN(numercicValue)) {
			throw new Error(`El valor ${value} no es del tipo number`)
		}
		super(value)
	}

	isBiggerThan(other: NumberValueObject): boolean {
		return this.value > other.value
	}
}
