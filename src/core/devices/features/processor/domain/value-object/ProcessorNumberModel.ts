import { StringValueObject } from '@/core/shared/domain/value-objects/StringValueObjects'

export class ProcessorNumberModel extends StringValueObject {
	static readonly NAME_MIN_LENGTH = 3
	static readonly NAME_MAX_LENGTH = 100

	constructor(value: string) {
		super(value)
		if (!ProcessorNumberModel.isValid(value)) {
			throw new Error(ProcessorNumberModel.invalidMessage(value))
		}
	}

	public static isValid(value: string): boolean {
		return (
			value.length >= ProcessorNumberModel.NAME_MIN_LENGTH &&
			value.length <= ProcessorNumberModel.NAME_MAX_LENGTH
		)
	}

	public static invalidMessage(value: string): string {
		return `El nombre ${value} no es válido. Debe tener entre ${ProcessorNumberModel.NAME_MIN_LENGTH} y ${ProcessorNumberModel.NAME_MAX_LENGTH} caracteres`
	}
}
