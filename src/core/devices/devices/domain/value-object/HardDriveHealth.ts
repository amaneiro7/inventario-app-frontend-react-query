import { NumberValueObject } from '@/core/shared/domain/value-objects/NumberValueObject'

export class HardDriveHealth extends NumberValueObject {
	static readonly MIN = 0
	static readonly MAX = 100

	constructor(value: number) {
		super(value)
		if (!HardDriveHealth.isValid({ value })) {
			throw new Error(HardDriveHealth.invalidMessage())
		}
	}

	public static isValid({ value }: { value: number }): boolean {
		return value >= HardDriveHealth.MIN && value <= HardDriveHealth.MAX
	}

	public static invalidMessage(): string {
		return `Invalid hard drive health score, must be between ${HardDriveHealth.MIN} and ${HardDriveHealth.MAX}`
	}
}
