import { NumberValueObject } from '@/core/shared/domain/value-objects/NumberValueObject'

export class ProcessorFrequency extends NumberValueObject {
	static readonly MIN = 1
	static readonly MAX = 6

	constructor(value: number) {
		super(value)
		// if (typeof this.value === 'string') {
		// 	this.value = ProcessorFrequency.convertToNumber(this.value)
		// }

		if (!ProcessorFrequency.isValid(this.value)) {
			throw new Error(ProcessorFrequency.invalidMessage(this.value))
		}
	}

	// private static convertToNumber(value: string | number): number {
	// 	if (typeof value === 'number') {
	// 		return value
	// 	} else if (typeof value === 'string') {
	// 		const numericString = value.replace(/\D/g, '') // Eliminar caracteres no numéricos
	// 		return parseInt(numericString, 10)
	// 	} else {
	// 		throw new Error('Invalid value type. Must be string or number.')
	// 	}
	// }

	public static isValid(value: number): boolean {
		return value >= ProcessorFrequency.MIN && value <= ProcessorFrequency.MAX
	}

	public static invalidMessage(value: number): string {
		return `La frecuencia ${value} no es válido. Debe estar entre ${ProcessorFrequency.MIN} y ${ProcessorFrequency.MAX}`
	}
}
