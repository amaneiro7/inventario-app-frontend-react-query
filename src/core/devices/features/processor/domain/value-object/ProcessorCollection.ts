import { StringValueObject } from '@/core/shared/domain/value-objects/StringValueObjects'

export class ProcessorProductCollection extends StringValueObject {
	static readonly NAME_MIN_LENGTH = 3
	static readonly NAME_MAX_LENGTH = 100

	constructor(value: string) {
		super(value)
		if (!ProcessorProductCollection.isValid(value)) {
			throw new Error(ProcessorProductCollection.invalidMessage(value))
		}
	}

	public static isValid(value: string): boolean {
		return (
			value?.length >= ProcessorProductCollection.NAME_MIN_LENGTH &&
			value?.length <= ProcessorProductCollection.NAME_MAX_LENGTH
		)
	}

	public static invalidMessage(value: string): string {
		return `El nombre ${value} no es válido. Debe tener entre ${ProcessorProductCollection.NAME_MIN_LENGTH} y ${ProcessorProductCollection.NAME_MAX_LENGTH} caracteres`
	}
}
